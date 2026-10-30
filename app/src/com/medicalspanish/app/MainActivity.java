package com.medicalspanish.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Locale;

/**
 * Hosts the lesson app (assets/www) in a WebView and exposes native
 * text-to-speech, speech recognition and persistent storage to it.
 */
public class MainActivity extends Activity implements TextToSpeech.OnInitListener {

    private static final int REQ_SPEECH = 4201;
    private static final String PREFS = "medspanish";

    private WebView web;
    private TextToSpeech tts;
    private volatile boolean ttsReady = false;
    private volatile String ttsLocale = "";
    private SharedPreferences prefs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        prefs = getSharedPreferences(PREFS, Context.MODE_PRIVATE);

        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);
        web.setWebChromeClient(new WebChromeClient());
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return !url.startsWith("file:///android_asset/");
            }
        });
        web.addJavascriptInterface(new Bridge(), "Android");
        setContentView(web);
        web.loadUrl("file:///android_asset/www/index.html");

        tts = new TextToSpeech(this, this);
    }

    @Override
    public void onInit(int status) {
        if (status != TextToSpeech.SUCCESS) return;
        Locale[] candidates = {
                new Locale("es", "US"), new Locale("es", "MX"),
                new Locale("es", "419"), new Locale("es", "ES"), new Locale("es")
        };
        for (Locale l : candidates) {
            int r = tts.isLanguageAvailable(l);
            if (r >= TextToSpeech.LANG_AVAILABLE) {
                tts.setLanguage(l);
                ttsLocale = l.toString();
                ttsReady = true;
                break;
            }
        }
        js("window.onTtsReady && window.onTtsReady(" + ttsReady + ")");
    }

    private void js(final String code) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (web != null) web.evaluateJavascript(code, null);
            }
        });
    }

    private class Bridge {
        @JavascriptInterface
        public boolean isTtsReady() {
            return ttsReady;
        }

        @JavascriptInterface
        public String ttsLocale() {
            return ttsLocale;
        }

        @JavascriptInterface
        public void speak(String text, float rate) {
            if (!ttsReady) return;
            tts.setSpeechRate(rate);
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "u" + System.nanoTime());
        }

        @JavascriptInterface
        public void stopSpeaking() {
            if (ttsReady) tts.stop();
        }

        @JavascriptInterface
        public void installVoices() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Intent i = new Intent(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA);
                        startActivity(i);
                    } catch (ActivityNotFoundException e) {
                        try {
                            startActivity(new Intent("com.android.settings.TTS_SETTINGS"));
                        } catch (ActivityNotFoundException ignored) {
                        }
                    }
                }
            });
        }

        @JavascriptInterface
        public boolean canListen() {
            return SpeechRecognizer.isRecognitionAvailable(MainActivity.this)
                    || !getPackageManager().queryIntentActivities(
                    new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH), 0).isEmpty();
        }

        @JavascriptInterface
        public void listen(final String prompt) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
                    i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
                    i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "es-MX");
                    i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, "es-MX");
                    i.putExtra("android.speech.extra.ONLY_RETURN_LANGUAGE_PREFERENCE", "es-MX");
                    i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5);
                    i.putExtra(RecognizerIntent.EXTRA_PROMPT, prompt);
                    try {
                        startActivityForResult(i, REQ_SPEECH);
                    } catch (ActivityNotFoundException e) {
                        js("window.onSpeechError && window.onSpeechError('unavailable')");
                    }
                }
            });
        }

        @JavascriptInterface
        public String loadState() {
            return prefs.getString("state", "");
        }

        @JavascriptInterface
        public void saveState(String json) {
            prefs.edit().putString("state", json).apply();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != REQ_SPEECH) return;
        if (resultCode == RESULT_OK && data != null) {
            ArrayList<String> results = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            JSONArray arr = new JSONArray();
            if (results != null) {
                for (String r : results) arr.put(r);
            }
            js("window.onSpeechResult && window.onSpeechResult(" + arr.toString() + ")");
        } else {
            js("window.onSpeechError && window.onSpeechError(" + JSONObject.quote("cancelled") + ")");
        }
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("window.handleBack ? window.handleBack() : false", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String value) {
                if (!"true".equals(value)) finish();
            }
        });
    }

    @Override
    protected void onDestroy() {
        if (tts != null) tts.shutdown();
        if (web != null) web.destroy();
        super.onDestroy();
    }
}
