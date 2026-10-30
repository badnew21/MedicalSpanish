# Medical Spanish

An offline Android app for learning conversational Spanish for the emergency department, in the style of Duolingo. The goal is to hold a basic history-and-exam conversation with a Spanish-speaking ED patient.

**Install:** download [`MedicalSpanish.apk`](MedicalSpanish.apk) to your phone, open it, and allow "install unknown apps" for your browser or file manager when Android asks. Requires Android 5.0+.

## What's inside

- **26 units** in a single path: everyday basics (greetings, numbers, time, family, feelings), medical units (body, symptoms, OPQRST pain assessment, history and meds, allergies and social history, exam commands, chest pain, stroke and breathing, trauma, pregnancy and peds, tests, comfort phrases, discharge) and grammar units (ser vs. estar, present tense, *doler*, *tener* expressions, past tense, *ir a*).
- **About 400 words, 190 phrases and 80 grammar drills.** Each unit opens with notes on the grammar and on how patients actually talk ("tengo azúcar", "se me corre al brazo"...).
- **Exercise types:** new-word cards, multiple choice both ways, listen-and-choose, tap-the-words sentence building, typing (accent-tolerant, with an accent keyboard), dictation, matching pairs, fill-in-the-blank grammar, and speaking checked by speech recognition.
- **Talk mode:** 7 role-play ED encounters (triage, chest pain, abdominal pain, febrile child, fall, shortness of breath, discharge). You pick or *say* the doctor's line and work out what the patient means.
- **Progress:** XP, levels (Estudiante → Interno → Residente → … → Jefe de urgencias), daily goal, day streak, 7-day chart, accuracy, achievements.
- **Spaced repetition:** every word and phrase you've seen gets a strength score. *Practice → Smart review* brings items back just before you'd forget them. There are also weak-spot, listening, speaking and medical rapid-fire drills.
- **Phrasebook:** searchable list of everything in the course with tap-to-hear audio, for use at the bedside.

Audio uses your phone's built-in text-to-speech. If you hear nothing, install a Spanish voice (Settings → Text-to-speech → Google → Install voice data → Spanish (United States) or Español (México)). Speaking exercises use Google speech recognition and can be turned off in the **Me** tab.

Progress is stored on the device only.

> This app is for learning and rapport. Use a qualified medical interpreter for consent, bad news and complex discussions.

## Project layout

```
app/AndroidManifest.xml
app/src/.../MainActivity.java   WebView host + native TTS, speech recognition, storage
app/assets/www/                 the app itself (HTML/CSS/JS, works offline)
  js/content.js                 all course content: units, drills, conversations
  js/app.js                     lesson engine, spaced repetition, XP/levels, UI
app/res/                        icon, theme
build.sh                        builds and signs MedicalSpanish.apk
keystore/                       signing key (so updates install over the old version)
tools/make_icon.py              regenerates the launcher icon
```

### Adding content

Edit `app/assets/www/js/content.js`. Words and phrases are `"spanish|english"` strings; drills are `"question with ___|answer|wrong1,wrong2,wrong3|english"`. Lessons are generated automatically from each unit. Bump `VERSION_CODE` when rebuilding so Android accepts the update.

### Building

No Gradle needed. On Ubuntu/Debian:

```sh
sudo apt-get install android-sdk-build-tools android-sdk-platform-23 openjdk-17-jdk zip
VERSION_CODE=2 VERSION_NAME=1.1 ./build.sh
```

To try the app in a desktop browser, open `app/assets/www/index.html` (audio and speech recognition depend on the browser).
