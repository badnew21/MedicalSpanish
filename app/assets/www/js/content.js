/*
 * Course content.
 *
 * Each unit has:
 *   words      "spanish|english" vocabulary cards
 *   sentences  "spanish|english" phrases used for sentence building and listening
 *   drills     "question with ___|answer|wrong1,wrong2,wrong3|english meaning"
 *   tip        grammar / culture notes (HTML) shown before the unit and in the reference tab
 *
 * Patient-facing Spanish uses the formal "usted" throughout, and vocabulary
 * leans toward Mexican / Central American usage, the most common in US EDs.
 */
window.UNITS = [
  {
    id: 'greet', track: 'basic', icon: '👋', title: 'Greetings & Courtesy',
    tip: `
<p>With patients, always use <b>usted</b> (formal "you"). It shows respect, and most patients expect it from clinicians.</p>
<table><tr><th>Formal (usted)</th><th>Informal (tú)</th></tr>
<tr><td>¿Cómo está?</td><td>¿Cómo estás?</td></tr>
<tr><td>¿Cómo se llama?</td><td>¿Cómo te llamas?</td></tr></table>
<p>Spanish questions open with <b>¿</b> and exclamations with <b>¡</b>.</p>
<p><b>Buenos días</b> runs until about noon, <b>buenas tardes</b> until dark, <b>buenas noches</b> after dark (it is both "good evening" and "good night").</p>`,
    words: [
      'hola|hello', 'buenos días|good morning', 'buenas tardes|good afternoon',
      'buenas noches|good evening', 'adiós|goodbye', 'hasta luego|see you later',
      'por favor|please', 'gracias|thank you', 'de nada|you\'re welcome',
      'perdón|excuse me', 'lo siento|I\'m sorry', 'sí|yes', 'señor|sir',
      'señora|ma\'am', 'mucho gusto|nice to meet you', 'bien|well',
      'mal|bad', 'más o menos|so-so'
    ],
    sentences: [
      'Buenos días, señora.|Good morning, ma\'am.',
      '¿Cómo está usted?|How are you?',
      'Estoy bien, gracias.|I am fine, thank you.',
      '¿Habla inglés?|Do you speak English?',
      'Hablo un poco de español.|I speak a little Spanish.',
      'Más despacio, por favor.|Slower, please.',
      '¿Puede repetir, por favor?|Can you repeat, please?',
      'No entiendo.|I don\'t understand.'
    ]
  },
  {
    id: 'intro', track: 'medical', icon: '🩺', title: 'Introductions in the ED',
    tip: `
<p>Introduce yourself and your role: <b>Soy el doctor Pérez</b> / <b>Soy la doctora Pérez</b>. Nurses: <b>el enfermero / la enfermera</b>.</p>
<p>Nouns have gender. Most ending in <b>-o</b> are masculine (<i>el</i>), most ending in <b>-a</b> are feminine (<i>la</i>). <i>El paciente / la paciente</i> just changes the article.</p>
<p class="warn">⚠️ Use a qualified medical interpreter for consent, bad news, and anything complex. This course is for rapport, triage-level history and everyday conversation.</p>`,
    words: [
      'el doctor|the doctor (male)', 'la doctora|the doctor (female)',
      'el enfermero|the nurse (male)', 'la enfermera|the nurse (female)',
      'el paciente|the patient', 'el intérprete|the interpreter',
      'la sala de emergencias|the emergency room', 'el hospital|the hospital',
      'la cama|the bed', 'me llamo|my name is', 'soy|I am',
      '¿Cómo se llama?|What is your name?', 'el nombre|the name',
      'el apellido|the last name', 'la fecha de nacimiento|the date of birth',
      'ayudar|to help', 'el familiar|the relative', 'entender|to understand'
    ],
    sentences: [
      'Soy el enfermero.|I am the nurse.',
      'Soy la doctora.|I am the doctor.',
      'Voy a ayudarle.|I am going to help you.',
      '¿Cómo se llama usted?|What is your name?',
      '¿Cuál es su fecha de nacimiento?|What is your date of birth?',
      '¿Necesita un intérprete?|Do you need an interpreter?',
      'Está en la sala de emergencias.|You are in the emergency room.',
      '¿Es usted familiar del paciente?|Are you a relative of the patient?'
    ]
  },
  {
    id: 'serestar', track: 'grammar', icon: '⚖️', title: 'Grammar: Ser vs. Estar',
    tip: `
<p>Both mean "to be".</p>
<p><b>SER</b>: identity, job, origin, relationships, time, what something <i>is</i>.<br><i>Soy médico. Es de Guatemala. Es mi hija. Son las tres.</i></p>
<p><b>ESTAR</b>: location, condition and feelings, how something <i>is right now</i>.<br><i>Está en el hospital. Estoy cansado. ¿Cómo está?</i></p>
<table><tr><th></th><th>ser</th><th>estar</th></tr>
<tr><td>yo</td><td>soy</td><td>estoy</td></tr>
<tr><td>tú</td><td>eres</td><td>estás</td></tr>
<tr><td>usted / él / ella</td><td>es</td><td>está</td></tr>
<tr><td>nosotros</td><td>somos</td><td>estamos</td></tr>
<tr><td>ustedes / ellos</td><td>son</td><td>están</td></tr></table>
<p><b>Usted</b> always takes the él/ella form of the verb.</p>`,
    words: [
      'yo|I', 'tú|you (informal)', 'usted|you (formal)', 'él|he', 'ella|she',
      'nosotros|we', 'ellos|they', 'ustedes|you all'
    ],
    drills: [
      'Yo ___ el doctor.|soy|estoy,es,está|I am the doctor.',
      'Usted ___ en el hospital.|está|es,soy,estoy|You are in the hospital.',
      '¿Cómo ___ usted?|está|es,son,estoy|How are you?',
      'Ella ___ enfermera.|es|está,soy,son|She is a nurse.',
      'Nosotros ___ aquí para ayudarle.|estamos|somos,están,son|We are here to help you.',
      'El paciente ___ cansado.|está|es,son,estoy|The patient is tired.',
      '¿De dónde ___ usted?|es|está,soy,están|Where are you from?',
      '¿Dónde ___ el baño?|está|es,son,soy|Where is the bathroom?',
      'Yo ___ muy preocupada.|estoy|soy,es,está|I am very worried.',
      'Ellos ___ mis hijos.|son|están,es,somos|They are my children.',
      'Hoy ___ lunes.|es|está,son,estoy|Today is Monday.',
      'La herida ___ infectada.|está|es,son,soy|The wound is infected.'
    ],
    sentences: [
      'Estoy aquí para ayudarle.|I am here to help you.',
      'Usted está en el hospital.|You are in the hospital.',
      'Ella es mi esposa.|She is my wife.',
      'Estoy cansado.|I am tired.',
      '¿De dónde es usted?|Where are you from?'
    ]
  },
  {
    id: 'feel', track: 'basic', icon: '🙂', title: 'Feelings & States',
    tip: `
<p>Feelings use <b>estar</b>: <i>Estoy nervioso.</i></p>
<p>Adjectives match the person: <b>-o</b> for a man, <b>-a</b> for a woman. <i>Él está cansado. Ella está cansada.</i></p>
<p><b>¿Cómo se siente?</b> = How do you feel? Answer: <i>Me siento mal</i> (I feel bad).</p>`,
    words: [
      'contento|happy', 'triste|sad', 'nervioso|nervous', 'preocupado|worried',
      'asustado|scared', 'enojado|angry', 'cansado|tired', 'confundido|confused',
      'tranquilo|calm', 'mejor|better', 'peor|worse', 'enfermo|sick',
      'sano|healthy', 'débil|weak'
    ],
    sentences: [
      '¿Cómo se siente?|How do you feel?',
      'Me siento mal.|I feel bad.',
      'Me siento mejor.|I feel better.',
      'Estoy muy nerviosa.|I am very nervous.',
      'Mi hijo está asustado.|My son is scared.',
      '¿Está confundido?|Are you confused?',
      'Hoy me siento peor.|Today I feel worse.'
    ]
  },
  {
    id: 'numbers', track: 'basic', icon: '🔢', title: 'Numbers',
    tip: `
<p>16–29 are one word: <i>dieciséis, veintiuno, veinticinco</i>. From 31 up, use <b>y</b>: <i>treinta y uno, noventa y nueve</i>.</p>
<p>Most Latin American patients think in <b>Celsius</b> and kilograms.</p>
<table><tr><th>°C</th><th>°F</th></tr><tr><td>37</td><td>98.6</td></tr><tr><td>38</td><td>100.4</td></tr><tr><td>39</td><td>102.2</td></tr><tr><td>40</td><td>104</td></tr></table>
<p><b>¿Cuántos años tiene?</b> = How old are you? (literally "how many years do you have?")</p>`,
    words: [
      'cero|zero', 'uno|one', 'dos|two', 'tres|three', 'cuatro|four', 'cinco|five',
      'seis|six', 'siete|seven', 'ocho|eight', 'nueve|nine', 'diez|ten',
      'once|eleven', 'doce|twelve', 'quince|fifteen', 'veinte|twenty',
      'treinta|thirty', 'cuarenta|forty', 'cincuenta|fifty', 'sesenta|sixty',
      'setenta|seventy', 'ochenta|eighty', 'noventa|ninety', 'cien|one hundred'
    ],
    drills: [
      '25 = ___|veinticinco|veinte cinco,cincuenta y dos,quince|twenty-five',
      '38 = ___|treinta y ocho|treinta ocho,ochenta y tres,trece|thirty-eight',
      '16 = ___|dieciséis|seis,sesenta,diez seis|sixteen',
      '72 = ___|setenta y dos|sesenta y dos,veintisiete,diecisiete|seventy-two',
      '14 = ___|catorce|cuarenta,cuatro,cuatrocientos|fourteen',
      '99 = ___|noventa y nueve|nueve nueve,diecinueve,novecientos|ninety-nine',
      '100 = ___|cien|mil,ciento,diez|one hundred',
      '67 = ___|sesenta y siete|setenta y seis,setenta y siete,diecisiete|sixty-seven'
    ],
    sentences: [
      '¿Cuántos años tiene?|How old are you?',
      'Tengo cuarenta años.|I am forty years old.',
      'Su temperatura es treinta y nueve grados.|Your temperature is thirty-nine degrees.',
      'Tome dos pastillas.|Take two pills.',
      'Tengo tres hijos.|I have three children.',
      'Peso setenta kilos.|I weigh seventy kilos.'
    ]
  },
  {
    id: 'time', track: 'basic', icon: '🕒', title: 'Time, Days & Dates',
    tip: `
<p><b>hace + time</b> = "ago": <i>hace dos días</i> (two days ago).<br><b>desde</b> = "since": <i>desde ayer</i> (since yesterday).</p>
<p>Telling time: <b>Es la una</b> (1:00) but <b>Son las dos / las tres</b>. Add <i>de la mañana / de la tarde / de la noche</i>.</p>
<p>Days of the week are not capitalized: <i>lunes, martes, miércoles, jueves, viernes, sábado, domingo</i>.</p>
<p>Careful: <b>mañana</b> = tomorrow, but <b>la mañana</b> = the morning.</p>`,
    words: [
      'hoy|today', 'ayer|yesterday', 'mañana|tomorrow', 'anoche|last night',
      'la mañana|the morning', 'la tarde|the afternoon', 'la noche|the night',
      'el día|the day', 'la semana|the week', 'el mes|the month', 'el año|the year',
      'la hora|the hour', 'el minuto|the minute', 'lunes|Monday', 'martes|Tuesday',
      'miércoles|Wednesday', 'jueves|Thursday', 'viernes|Friday', 'sábado|Saturday',
      'domingo|Sunday', 'ahora|now', 'antes|before', 'después|after',
      'siempre|always', 'nunca|never', 'a veces|sometimes'
    ],
    drills: [
      'Two days ago = ___ dos días|hace|desde,por,hay|two days ago',
      'Since yesterday = ___ ayer|desde|hace,por,hay|since yesterday',
      'It is one o\'clock = ___ la una|Es|Son,Está,Hay|It is one o\'clock.',
      'It is three o\'clock = ___ las tres|Son|Es,Están,Hay|It is three o\'clock.',
      'in the afternoon = de la ___|tarde|mañana,noche,hora|in the afternoon',
      'last night = ___|anoche|mañana,ayer noche,la noche|last night'
    ],
    sentences: [
      '¿Qué hora es?|What time is it?',
      'Son las tres de la tarde.|It is three in the afternoon.',
      'Empezó hace dos días.|It started two days ago.',
      '¿Desde cuándo?|Since when?',
      'Desde anoche.|Since last night.',
      'El dolor viene y va.|The pain comes and goes.',
      '¿Cada cuánto?|How often?',
      'Tome la pastilla en la mañana.|Take the pill in the morning.'
    ]
  },
  {
    id: 'questions', track: 'basic', icon: '❓', title: 'Question Words',
    tip: `
<p>Question words always carry an accent: <b>qué, quién, dónde, cuándo, cómo, cuánto, cuál, por qué</b>.</p>
<p><b>¿Por qué?</b> = why? &nbsp; <b>porque</b> = because.</p>
<p><b>¿Cuánto?</b> changes to match: <i>¿cuántos años?</i> (masc. plural), <i>¿cuántas veces?</i> (fem. plural).</p>
<p>In speech you can turn any sentence into a yes/no question just with rising intonation: <i>¿Tiene fiebre?</i></p>`,
    words: [
      '¿qué?|what?', '¿quién?|who?', '¿dónde?|where?', '¿cuándo?|when?',
      '¿cómo?|how?', '¿cuánto?|how much?', '¿cuántos?|how many?',
      '¿por qué?|why?', '¿cuál?|which?', 'porque|because'
    ],
    drills: [
      '¿___ le duele? (where)|Dónde|Cuándo,Cómo,Qué|Where does it hurt?',
      '¿___ empezó? (when)|Cuándo|Dónde,Quién,Cuál|When did it start?',
      '¿___ años tiene?|Cuántos|Cuántas,Cuánto,Cómo|How old are you?',
      '¿___ se siente? (how)|Cómo|Qué,Dónde,Cuál|How do you feel?',
      '¿___ vino hoy? (why)|Por qué|Porque,Qué,Cuándo|Why did you come today?',
      '¿___ pasó? (what)|Qué|Quién,Cuál,Cómo|What happened?',
      '¿___ está con usted? (who)|Quién|Qué,Cuál,Dónde|Who is with you?',
      '¿___ veces? (how many)|Cuántas|Cuántos,Cuánto,Cómo|How many times?'
    ],
    sentences: [
      '¿Qué le pasa?|What is wrong?',
      '¿Qué pasó?|What happened?',
      '¿Cuándo empezó?|When did it start?',
      '¿Por qué vino hoy?|Why did you come today?',
      '¿Cuántas veces?|How many times?',
      '¿Quién está con usted?|Who is with you?',
      '¿Cuál es su número de teléfono?|What is your phone number?',
      '¿En qué le puedo ayudar?|How can I help you?'
    ]
  },
  {
    id: 'present', track: 'grammar', icon: '✏️', title: 'Grammar: Present Tense',
    tip: `
<p>Drop <b>-ar / -er / -ir</b> and add endings:</p>
<table><tr><th></th><th>tomar</th><th>comer</th><th>vivir</th></tr>
<tr><td>yo</td><td>tomo</td><td>como</td><td>vivo</td></tr>
<tr><td>usted/él/ella</td><td>toma</td><td>come</td><td>vive</td></tr>
<tr><td>nosotros</td><td>tomamos</td><td>comemos</td><td>vivimos</td></tr>
<tr><td>ustedes/ellos</td><td>toman</td><td>comen</td><td>viven</td></tr></table>
<p>Negate with <b>no</b> before the verb: <i>No fumo.</i></p>
<p>Stem changers: <b>dormir → duermo</b>, <b>poder → puedo</b>, <b>sentir → siento</b>, <b>doler → duele</b>.</p>
<p>You usually drop the pronoun: <i>Fumo</i> = I smoke.</p>`,
    words: [
      'hablar|to speak', 'tomar|to take', 'trabajar|to work', 'respirar|to breathe',
      'comer|to eat', 'beber|to drink', 'vivir|to live', 'toser|to cough',
      'vomitar|to vomit', 'caminar|to walk', 'dormir|to sleep',
      'necesitar|to need', 'fumar|to smoke', 'orinar|to urinate', 'poder|to be able to'
    ],
    drills: [
      'Yo ___ un poco de español. (hablar)|hablo|habla,hablas,hablan|I speak a little Spanish.',
      '¿Usted ___? (fumar)|fuma|fumo,fumas,fuman|Do you smoke?',
      '¿___ usted algún medicamento? (tomar)|Toma|Tomo,Tomas,Toman|Do you take any medication?',
      'Mi hijo no ___ bien. (comer)|come|como,comes,comen|My son isn\'t eating well.',
      '¿Con quién ___ usted? (vivir)|vive|vivo,vives,viven|Who do you live with?',
      'Nosotros ___ una muestra de orina. (necesitar)|necesitamos|necesita,necesito,necesitan|We need a urine sample.',
      '¿___ usted alcohol? (beber)|Bebe|Bebo,Bebes,Beben|Do you drink alcohol?',
      'Ellos ___ en el campo. (trabajar)|trabajan|trabaja,trabajo,trabajamos|They work in the fields.',
      'Yo no ___ bien. (dormir)|duermo|dormo,duerme,dormimos|I don\'t sleep well.',
      'Usted ___ muy rápido. (respirar)|respira|respiro,respiras,respiran|You are breathing very fast.',
      '¿___ caminar? (poder)|Puede|Pode,Puedo,Podemos|Can you walk?'
    ],
    sentences: [
      '¿Fuma usted?|Do you smoke?',
      '¿Toma alcohol?|Do you drink alcohol?',
      'Vivo con mi esposa.|I live with my wife.',
      'No duermo bien.|I don\'t sleep well.',
      '¿Puede caminar?|Can you walk?',
      'Necesito orinar.|I need to urinate.'
    ]
  },
  {
    id: 'body1', track: 'medical', icon: '🧠', title: 'Body: Head & Torso',
    tip: `
<p>Spanish uses the article, not "my/your", with body parts: <b>Me duele la cabeza</b> (my head hurts), not <i>mi cabeza</i>.</p>
<p><b>el oído</b> = inner ear / hearing; <b>la oreja</b> = the outer ear.</p>
<p>Patients often say <b>la panza</b> or <b>la barriga</b> for belly, and <b>el estómago</b> for the whole abdomen.</p>`,
    words: [
      'la cabeza|the head', 'la cara|the face', 'los ojos|the eyes',
      'el oído|the ear (inner)', 'la oreja|the ear (outer)', 'la nariz|the nose',
      'la boca|the mouth', 'los dientes|the teeth', 'la lengua|the tongue',
      'la garganta|the throat', 'el cuello|the neck', 'el pecho|the chest',
      'la espalda|the back', 'los hombros|the shoulders', 'el estómago|the stomach',
      'el abdomen|the abdomen', 'la barriga|the belly', 'el corazón|the heart',
      'los pulmones|the lungs', 'la mandíbula|the jaw'
    ],
    sentences: [
      'Me duele la cabeza.|My head hurts.',
      'Abra la boca.|Open your mouth.',
      'Tengo dolor de garganta.|I have a sore throat.',
      'Muéstreme dónde.|Show me where.',
      '¿Le duele aquí?|Does it hurt here?',
      'Me duele la espalda.|My back hurts.',
      'Cierre los ojos.|Close your eyes.'
    ]
  },
  {
    id: 'body2', track: 'medical', icon: '🦵', title: 'Body: Limbs & Organs',
    tip: `
<p><b>la mano</b> is feminine even though it ends in -o.</p>
<p>Right / left: <b>derecho / derecha</b>, <b>izquierdo / izquierda</b>. They match the noun: <i>el brazo derecho, la pierna izquierda</i>.</p>
<p>Careful: <b>derecho</b> also means "straight"; <b>a la derecha</b> = to the right.</p>`,
    words: [
      'el brazo|the arm', 'el codo|the elbow', 'la muñeca|the wrist',
      'la mano|the hand', 'los dedos|the fingers', 'la pierna|the leg',
      'la rodilla|the knee', 'el tobillo|the ankle', 'el pie|the foot',
      'la cadera|the hip', 'el hígado|the liver', 'los riñones|the kidneys',
      'la vejiga|the bladder', 'los huesos|the bones', 'la piel|the skin',
      'la sangre|the blood', 'el cerebro|the brain', 'los intestinos|the intestines',
      'derecho|right (side)', 'izquierdo|left (side)'
    ],
    sentences: [
      'Mueva los dedos.|Move your fingers.',
      'Me duele la rodilla izquierda.|My left knee hurts.',
      'Levante el brazo derecho.|Raise your right arm.',
      '¿Puede mover el pie?|Can you move your foot?',
      'Tengo la mano hinchada.|My hand is swollen.',
      'Me duele la pierna derecha.|My right leg hurts.'
    ]
  },
  {
    id: 'doler', track: 'grammar', icon: '🤕', title: 'Grammar: Doler (to hurt)',
    tip: `
<p><b>Doler</b> works like <i>gustar</i>: the thing that hurts is the subject, the person is an indirect object.</p>
<table><tr><td>me duele</td><td>it hurts me</td></tr>
<tr><td>le duele</td><td>it hurts you (usted) / him / her</td></tr>
<tr><td>nos duele</td><td>it hurts us</td></tr></table>
<p>Singular thing → <b>duele</b>; plural things → <b>duelen</b>.<br><i>Me duele la cabeza. Me duelen los pies.</i></p>
<p>Same pattern: <b>me pica</b> (it itches), <b>me arde</b> (it burns), <b>me molesta</b> (it bothers me).</p>
<p>The ED question: <b>¿Dónde le duele?</b></p>`,
    words: [
      'doler|to hurt', 'me duele|it hurts (me)', 'me duelen|they hurt (me)',
      'le duele|it hurts (you)', 'el dolor|the pain', 'molestar|to bother',
      'picar|to itch', 'arder|to burn (sting)'
    ],
    drills: [
      'Me ___ la cabeza.|duele|duelen,dolor,duelo|My head hurts.',
      'Me ___ los pies.|duelen|duele,dolor,duelo|My feet hurt.',
      '¿___ duele el estómago? (you, formal)|Le|Me,Te,Les|Does your stomach hurt?',
      '¿Dónde le ___?|duele|duelen,dolor,dolió|Where does it hurt?',
      'A mi hijo le ___ el oído.|duele|duelen,duelo,dolor|My son\'s ear hurts.',
      'Me ___ los ojos. (itch)|pican|pica,pico,picar|My eyes itch.',
      'Me ___ al orinar. (burns)|arde|arden,ardo,arder|It burns when I urinate.',
      '¿Le ___ las rodillas?|duelen|duele,duelo,dolor|Do your knees hurt?'
    ],
    sentences: [
      'Me duele mucho.|It hurts a lot.',
      '¿Le duele cuando respira?|Does it hurt when you breathe?',
      'Me arde al orinar.|It burns when I urinate.',
      'Me pican los ojos.|My eyes itch.',
      'A mi hija le duele el oído.|My daughter\'s ear hurts.'
    ]
  },
  {
    id: 'symptoms', track: 'medical', icon: '🤒', title: 'Symptoms',
    tip: `
<p>Most symptoms go with <b>tener</b>: <i>Tengo fiebre, tengo tos, tengo náuseas.</i></p>
<p>Some with <b>estar</b>: <i>Estoy mareado</i> (I'm dizzy).</p>
<p><b>¿Ha vomitado?</b> = Have you vomited? (<i>ha</i> + -ado/-ido = "have done").</p>
<p>Patients may say <b>calentura</b> for fever and <b>basca / ganas de vomitar</b> for nausea.</p>`,
    words: [
      'la fiebre|the fever', 'los escalofríos|the chills', 'la tos|the cough',
      'las náuseas|nausea', 'los vómitos|vomiting', 'la diarrea|diarrhea',
      'el estreñimiento|constipation', 'el mareo|dizziness', 'la debilidad|weakness',
      'el cansancio|fatigue', 'la falta de aire|shortness of breath',
      'el sarpullido|the rash', 'la hinchazón|the swelling', 'el sangrado|the bleeding',
      'el entumecimiento|numbness', 'el hormigueo|tingling', 'la convulsión|the seizure',
      'desmayarse|to faint', 'sudar|to sweat', 'la flema|phlegm'
    ],
    sentences: [
      'Tengo fiebre y escalofríos.|I have fever and chills.',
      '¿Tiene náuseas?|Do you have nausea?',
      '¿Ha vomitado?|Have you vomited?',
      'Estoy mareado.|I am dizzy.',
      'Me falta el aire.|I am short of breath.',
      '¿Tiene tos con flema?|Do you have a cough with phlegm?',
      '¿Hay sangre en el vómito?|Is there blood in the vomit?',
      'Me desmayé.|I fainted.'
    ]
  },
  {
    id: 'pain', track: 'medical', icon: '📍', title: 'Pain Assessment (OPQRST)',
    tip: `
<table><tr><th>OPQRST</th><th>Spanish</th></tr>
<tr><td>Onset</td><td>¿Cuándo empezó? ¿Qué estaba haciendo?</td></tr>
<tr><td>Provokes</td><td>¿Qué lo mejora? ¿Qué lo empeora?</td></tr>
<tr><td>Quality</td><td>¿Cómo es el dolor?</td></tr>
<tr><td>Radiation</td><td>¿El dolor se va a otra parte?</td></tr>
<tr><td>Severity</td><td>Del cero al diez, ¿cuánto le duele?</td></tr>
<tr><td>Time</td><td>¿Es constante o viene y va?</td></tr></table>
<p>Describing pain: <i>agudo</i> (sharp), <i>punzante</i> (stabbing), <i>quemante / ardor</i> (burning), <i>opresivo / presión</i> (pressure), <i>cólico</i> (cramping).</p>
<p>Patients often say <b>se me corre</b> for radiation: <i>"Se me corre al brazo."</i></p>`,
    words: [
      'agudo|sharp', 'sordo|dull', 'punzante|stabbing', 'quemante|burning',
      'la presión|pressure', 'el cólico|cramping', 'constante|constant',
      'leve|mild', 'moderado|moderate', 'fuerte|severe', 'insoportable|unbearable',
      'el peor|the worst', 'empeorar|to get worse', 'mejorar|to get better',
      'se corre|it spreads'
    ],
    sentences: [
      '¿Dónde le duele?|Where does it hurt?',
      '¿Cuándo empezó el dolor?|When did the pain start?',
      '¿Cómo es el dolor?|What is the pain like?',
      'Del cero al diez, ¿cuánto le duele?|From zero to ten, how much does it hurt?',
      '¿El dolor se va a otra parte?|Does the pain go somewhere else?',
      '¿Qué lo mejora?|What makes it better?',
      '¿Qué lo empeora?|What makes it worse?',
      '¿Es constante o viene y va?|Is it constant or does it come and go?',
      '¿Ha tenido este dolor antes?|Have you had this pain before?',
      'Es un dolor muy fuerte.|It is a very strong pain.'
    ]
  },
  {
    id: 'tener', track: 'grammar', icon: '🌡️', title: 'Grammar: Tener Expressions',
    tip: `
<table><tr><th>tener</th><th></th></tr>
<tr><td>yo</td><td>tengo</td></tr><tr><td>tú</td><td>tienes</td></tr>
<tr><td>usted/él/ella</td><td>tiene</td></tr><tr><td>nosotros</td><td>tenemos</td></tr>
<tr><td>ustedes/ellos</td><td>tienen</td></tr></table>
<p>Where English says "to be", Spanish often says "to have":</p>
<p><i>tener frío</i> (be cold), <i>tener calor</i> (be hot), <i>tener hambre</i> (be hungry), <i>tener sed</i> (be thirsty), <i>tener sueño</i> (be sleepy), <i>tener miedo</i> (be afraid), <i>tener 30 años</i> (be 30).</p>
<p><b>tener que + verb</b> = to have to: <i>Tiene que quedarse.</i></p>`,
    words: [
      'tener|to have', 'tener frío|to be cold', 'tener calor|to be hot',
      'tener hambre|to be hungry', 'tener sed|to be thirsty', 'tener sueño|to be sleepy',
      'tener miedo|to be afraid', 'tener que|to have to'
    ],
    drills: [
      'Yo ___ frío.|tengo|tiene,tienes,tenemos|I am cold.',
      '¿Usted ___ sed?|tiene|tengo,tienen,tenemos|Are you thirsty?',
      'Mi hijo ___ fiebre.|tiene|tengo,tienen,tienes|My son has a fever.',
      'Nosotros ___ que hacer unos análisis.|tenemos|tiene,tengo,tienen|We have to do some tests.',
      '¿Cuántos años ___ usted?|tiene|tengo,tienes,tienen|How old are you?',
      'Tengo ___. (I\'m afraid)|miedo|hambre,frío,sueño|I am afraid.',
      'Tengo ___. (I\'m hungry)|hambre|sed,calor,miedo|I am hungry.',
      'Usted ___ que tomar mucha agua.|tiene|tengo,tienen,tenemos|You have to drink a lot of water.',
      'Ellos ___ calor.|tienen|tiene,tenemos,tengo|They are hot.'
    ],
    sentences: [
      'Tengo mucho frío.|I am very cold.',
      '¿Tiene hambre?|Are you hungry?',
      'Tengo miedo.|I am afraid.',
      'Tiene que quedarse en el hospital.|You have to stay in the hospital.',
      'Mi hijo tiene cinco años.|My son is five years old.'
    ]
  },
  {
    id: 'history', track: 'medical', icon: '📋', title: 'Medical History & Meds',
    tip: `
<p>Patients often use everyday terms:</p>
<table><tr><td><b>tengo azúcar</b></td><td>I have diabetes</td></tr>
<tr><td><b>la presión alta</b></td><td>high blood pressure</td></tr>
<tr><td><b>un infarto / ataque al corazón</b></td><td>heart attack</td></tr>
<tr><td><b>un derrame / una embolia</b></td><td>stroke</td></tr>
<tr><td><b>me operaron</b></td><td>I had surgery</td></tr></table>
<p><b>¿Ha tenido...?</b> = Have you had...?</p>
<p>Ask patients to show you their pill bottles: <i>¿Trajo sus medicamentos?</i></p>`,
    words: [
      'la enfermedad|the illness', 'la diabetes|diabetes', 'la presión alta|high blood pressure',
      'el asma|asthma', 'el colesterol alto|high cholesterol', 'el infarto|heart attack',
      'el derrame cerebral|stroke', 'el cáncer|cancer', 'la operación|surgery',
      'el medicamento|the medication', 'la pastilla|the pill', 'la insulina|insulin',
      'la dosis|the dose', 'la receta|the prescription', 'el anticoagulante|blood thinner',
      'la vacuna|the vaccine', 'el azúcar|sugar'
    ],
    sentences: [
      '¿Tiene problemas de salud?|Do you have health problems?',
      '¿Tiene diabetes o presión alta?|Do you have diabetes or high blood pressure?',
      '¿Qué medicamentos toma?|What medications do you take?',
      '¿Toma algún anticoagulante?|Do you take any blood thinner?',
      '¿Ha tenido alguna operación?|Have you had any surgery?',
      '¿Trajo sus medicamentos?|Did you bring your medications?',
      'Tomo pastillas para la presión.|I take pills for blood pressure.',
      'Me pongo insulina.|I take insulin.'
    ]
  },
  {
    id: 'social', track: 'medical', icon: '🚬', title: 'Allergies & Social History',
    tip: `
<p><b>alérgico / alérgica a</b> + thing: <i>Soy alérgica a la penicilina.</i></p>
<p>Always ask what the reaction was: <i>¿Qué le pasa cuando la toma?</i></p>
<p>Sensitive questions go better with a reassurance: <i>Esta información es confidencial.</i></p>
<p>Note: <b>tomar</b> means both "to take" (pills) and "to drink" (alcohol).</p>`,
    words: [
      'la alergia|the allergy', 'alérgico|allergic', 'la penicilina|penicillin',
      'el látex|latex', 'el cigarrillo|the cigarette', 'el alcohol|alcohol',
      'las drogas|drugs', 'la cerveza|beer', 'el trabajo|the job', 'casado|married',
      'soltero|single', 'solo|alone', 'el seguro médico|health insurance',
      'la dirección|the address'
    ],
    sentences: [
      '¿Es alérgico a algún medicamento?|Are you allergic to any medication?',
      'Soy alérgico a la penicilina.|I am allergic to penicillin.',
      '¿Qué le pasa cuando la toma?|What happens when you take it?',
      '¿Cuántos cigarrillos fuma al día?|How many cigarettes do you smoke a day?',
      '¿Cuánto alcohol toma?|How much alcohol do you drink?',
      '¿Usa drogas?|Do you use drugs?',
      '¿Vive solo?|Do you live alone?',
      '¿En qué trabaja?|What do you do for work?',
      'Esta información es confidencial.|This information is confidential.'
    ]
  },
  {
    id: 'preterite', track: 'grammar', icon: '⏪', title: 'Grammar: Past Tense',
    tip: `
<p>The <b>preterite</b> is for completed events. That covers most of the history of present illness.</p>
<table><tr><th></th><th>-ar (tomar)</th><th>-er/-ir (comer)</th></tr>
<tr><td>yo</td><td>tomé</td><td>comí</td></tr>
<tr><td>usted/él/ella</td><td>tomó</td><td>comió</td></tr>
<tr><td>nosotros</td><td>tomamos</td><td>comimos</td></tr>
<tr><td>ustedes/ellos</td><td>tomaron</td><td>comieron</td></tr></table>
<p>Key irregulars: <b>caer → me caí / se cayó</b>, <b>tener → tuve / tuvo</b>, <b>ir → fui / fue</b>, <b>hacer → hice / hizo</b>, <b>dormir → durmió</b>.</p>
<p><b>Present perfect</b> ("have you ever..."): <i>¿Ha tenido...? ¿Ha vomitado?</i></p>
<p>Ongoing background uses the imperfect: <i>¿Qué estaba haciendo?</i> (What were you doing?)</p>`,
    words: [
      'empezó|it started', 'pasó|it happened', 'comí|I ate', 'tomé|I took',
      'me caí|I fell', 'se cayó|you fell', 'se golpeó|you hit yourself',
      'vomité|I vomited', 'tuve|I had', 'fui|I went'
    ],
    drills: [
      '¿Cuándo ___ el dolor? (empezar)|empezó|empieza,empecé,empezaron|When did the pain start?',
      'Ayer yo ___ mariscos. (comer)|comí|como,comió,comer|Yesterday I ate seafood.',
      '¿___ usted algo para el dolor? (tomar)|Tomó|Toma,Tomé,Tomaron|Did you take something for the pain?',
      'Mi papá se ___ en el baño. (caer)|cayó|cae,caí,cayeron|My dad fell in the bathroom.',
      '¿Cuántas veces ___? (vomitar)|vomitó|vomita,vomité,vomitar|How many times did you vomit?',
      'Yo ___ el conocimiento. (perder)|perdí|pierdo,perdió,perder|I lost consciousness.',
      '¿Qué ___? (pasar)|pasó|pasa,pasé,pasaron|What happened?',
      'Anoche no ___ nada. (dormir)|dormí|duermo,durmió,dormir|Last night I didn\'t sleep at all.',
      '¿Se ___ la cabeza? (golpear)|golpeó|golpea,golpeé,golpear|Did you hit your head?',
      'Ayer ___ fiebre. (tener, yo)|tuve|tengo,tuvo,tenía|Yesterday I had a fever.'
    ],
    sentences: [
      '¿Qué comió ayer?|What did you eat yesterday?',
      'Me caí de la escalera.|I fell off the ladder.',
      '¿Se golpeó la cabeza?|Did you hit your head?',
      '¿Perdió el conocimiento?|Did you lose consciousness?',
      'Vomité tres veces.|I vomited three times.',
      '¿Qué estaba haciendo?|What were you doing?'
    ]
  },
  {
    id: 'exam', track: 'medical', icon: '👐', title: 'Physical Exam Commands',
    tip: `
<p><b>Formal commands (usted)</b>: take the <i>yo</i> form, drop the -o, and add the "opposite" vowel.</p>
<table><tr><td>abrir → abro →</td><td><b>abra</b></td></tr>
<tr><td>respirar → respiro →</td><td><b>respire</b></td></tr>
<tr><td>toser → toso →</td><td><b>tosa</b></td></tr>
<tr><td>hacer → hago →</td><td><b>haga</b></td></tr></table>
<p>Reflexive verbs attach <b>-se</b>: <i>siéntese, acuéstese, levántese</i>.<br>Negative puts it in front: <b>No se mueva.</b></p>
<p>Soften with <b>por favor</b>. Saying <b>Voy a...</b> before you touch someone helps a lot: <i>Voy a tocar su barriga.</i></p>`,
    words: [
      'siéntese|sit down', 'acuéstese|lie down', 'levántese|stand up',
      'respire profundo|take a deep breath', 'abra la boca|open your mouth',
      'saque la lengua|stick out your tongue', 'mire aquí|look here',
      'siga mi dedo|follow my finger', 'apriete mi mano|squeeze my hand',
      'empuje|push', 'jale|pull', 'relájese|relax', 'no se mueva|don\'t move',
      'voltéese|turn over', 'doble la rodilla|bend your knee', 'tosa|cough',
      'quítese la ropa|take off your clothes', 'póngase la bata|put on the gown'
    ],
    sentences: [
      'Voy a examinarle.|I am going to examine you.',
      'Respire profundo por la boca.|Breathe deeply through your mouth.',
      'Acuéstese boca arriba.|Lie down on your back.',
      'Acuéstese boca abajo.|Lie down on your stomach.',
      'Dígame si le duele.|Tell me if it hurts.',
      'Apriete mis dedos.|Squeeze my fingers.',
      'Póngase esta bata, por favor.|Put on this gown, please.',
      'Voy a escuchar su corazón.|I am going to listen to your heart.'
    ]
  },
  {
    id: 'family', track: 'basic', icon: '👨‍👩‍👧', title: 'Family & Daily Life',
    tip: `
<p>Family is central. Expect relatives at the bedside, and they're often key historians.</p>
<p><b>los hijos</b> = children (sons and daughters together). <b>los padres</b> = parents.</p>
<p><b>su</b> = your (formal) / his / her: <i>su esposa</i> = your wife.</p>
<p>Many say <b>mi mamá / mi papá</b> rather than <i>mi madre / mi padre</i>.</p>`,
    words: [
      'la mamá|mom', 'el papá|dad', 'el esposo|the husband', 'la esposa|the wife',
      'el hijo|the son', 'la hija|the daughter', 'los hijos|the children',
      'el hermano|the brother', 'la hermana|the sister', 'el abuelo|the grandfather',
      'la abuela|the grandmother', 'el bebé|the baby', 'el niño|the boy',
      'la niña|the girl', 'la casa|the house', 'el agua|the water',
      'la comida|the food', 'el baño|the bathroom', 'el teléfono|the phone'
    ],
    sentences: [
      '¿Tiene hijos?|Do you have children?',
      'Mi esposa está en camino.|My wife is on the way.',
      '¿Quiere que llamemos a alguien?|Do you want us to call someone?',
      '¿Quiere agua?|Do you want water?',
      '¿Necesita ir al baño?|Do you need to go to the bathroom?',
      'Su familia puede esperar aquí.|Your family can wait here.',
      'Mi mamá tiene diabetes.|My mom has diabetes.'
    ]
  },
  {
    id: 'emerg', track: 'medical', icon: '🚨', title: 'Chest Pain, Stroke & Breathing',
    tip: `
<p><b>Chest pain:</b> <i>¿Siente presión en el pecho? ¿Se le corre al brazo o a la mandíbula? ¿Está sudando?</i></p>
<p><b>Stroke (BE-FAST):</b> <i>Sonría</i> (smile), <i>Levante los brazos</i> (raise your arms), <i>Repita: "Hoy es un día bonito"</i> (repeat). Last known well: <i>¿A qué hora lo vieron normal por última vez?</i></p>
<p><b>Breathing:</b> <i>¿Le falta el aire? ¿Usa inhalador? ¿Puede hablar en oraciones completas?</i></p>`,
    words: [
      'el dolor de pecho|chest pain', 'las palpitaciones|palpitations',
      'el sudor frío|cold sweat', 'sonría|smile', 'levante los brazos|raise your arms',
      'la debilidad de un lado|weakness on one side', 'la visión borrosa|blurred vision',
      'la boca chueca|facial droop', 'hablar arrastrado|slurred speech',
      'el inhalador|the inhaler', 'el oxígeno|oxygen', 'el silbido en el pecho|wheezing',
      'el desmayo|fainting'
    ],
    sentences: [
      '¿Siente presión en el pecho?|Do you feel pressure in your chest?',
      '¿El dolor se va al brazo o a la mandíbula?|Does the pain go to the arm or the jaw?',
      '¿Siente el corazón acelerado?|Do you feel your heart racing?',
      'Sonría, por favor.|Smile, please.',
      'Levante los dos brazos.|Raise both arms.',
      '¿A qué hora empezaron los síntomas?|What time did the symptoms start?',
      '¿A qué hora lo vieron normal por última vez?|What time was he last seen normal?',
      'Le vamos a poner oxígeno.|We are going to give you oxygen.',
      '¿Usa inhalador?|Do you use an inhaler?'
    ]
  },
  {
    id: 'trauma', track: 'medical', icon: '🩹', title: 'Trauma & Injuries',
    tip: `
<p><b>¿Cómo se lastimó?</b> = How did you hurt yourself?</p>
<p>Mechanism: <i>me caí</i> (I fell), <i>choqué</i> (I crashed), <i>me cortó</i> (it cut me), <i>me quemé</i> (I got burned), <i>me pegaron</i> (someone hit me).</p>
<p><b>el moretón</b> (bruise) is also <i>el morado</i> in many places. <b>la cortada</b> = cut (Mexico); <i>el corte</i> elsewhere.</p>
<p>Spine precautions: <b>No mueva el cuello.</b></p>`,
    words: [
      'la herida|the wound', 'la cortada|the cut', 'la quemadura|the burn',
      'el golpe|the blow', 'el moretón|the bruise', 'la fractura|the fracture',
      'roto|broken', 'el accidente de carro|car accident', 'la caída|the fall',
      'el cinturón de seguridad|seat belt', 'el casco|helmet', 'los puntos|stitches',
      'el yeso|the cast', 'la férula|the splint', 'sangrar|to bleed',
      'la vacuna del tétano|tetanus shot', 'hinchado|swollen'
    ],
    sentences: [
      '¿Cómo se lastimó?|How did you hurt yourself?',
      '¿Llevaba el cinturón de seguridad?|Were you wearing a seat belt?',
      '¿Se desmayó después del golpe?|Did you faint after the blow?',
      'Necesita puntos.|You need stitches.',
      'Vamos a tomar una radiografía.|We are going to take an X-ray.',
      '¿Cuándo fue su última vacuna del tétano?|When was your last tetanus shot?',
      'No mueva el cuello.|Don\'t move your neck.',
      'Presione aquí para parar el sangrado.|Press here to stop the bleeding.'
    ]
  },
  {
    id: 'womenpeds', track: 'medical', icon: '🤰', title: 'Pregnancy & Pediatrics',
    tip: `
<p>Ask every woman of child-bearing age: <b>¿Hay posibilidad de que esté embarazada?</b></p>
<p><b>la regla</b> is the everyday word for period (also <i>la menstruación</i>). <b>LMP</b> = <i>la última regla</i>.</p>
<p>For kids, talk to the parent about the child in the third person: <i>¿Está comiendo? ¿Tiene sus vacunas al día?</i></p>
<p>Hydration check: <i>¿Cuántos pañales mojados hoy?</i></p>`,
    words: [
      'embarazada|pregnant', 'el embarazo|pregnancy', 'la regla|the period',
      'la última regla|last menstrual period', 'el sangrado vaginal|vaginal bleeding',
      'las contracciones|contractions', 'se me rompió la fuente|my water broke',
      'dar pecho|to breastfeed', 'el pañal|the diaper', 'llorar|to cry',
      'irritable|fussy', 'el biberón|the bottle', 'las vacunas|vaccines'
    ],
    sentences: [
      '¿Está embarazada?|Are you pregnant?',
      '¿Cuándo fue su última regla?|When was your last period?',
      '¿Hay posibilidad de que esté embarazada?|Is there a possibility that you are pregnant?',
      '¿Cuántos pañales mojados hoy?|How many wet diapers today?',
      '¿El niño tiene sus vacunas al día?|Are the child\'s vaccines up to date?',
      '¿Le dio algo para la fiebre?|Did you give him something for the fever?',
      'Se me rompió la fuente.|My water broke.',
      '¿Está dando pecho?|Are you breastfeeding?'
    ]
  },
  {
    id: 'ira', track: 'grammar', icon: '➡️', title: 'Grammar: Going To (ir a)',
    tip: `
<p><b>ir a + infinitive</b> = going to do something. The easiest way to explain what will happen next.</p>
<table><tr><td>yo</td><td>voy a</td></tr><tr><td>usted/él/ella</td><td>va a</td></tr>
<tr><td>nosotros</td><td>vamos a</td></tr><tr><td>ustedes/ellos</td><td>van a</td></tr></table>
<p>Object pronouns can go before <i>or</i> attach: <b>Le voy a examinar</b> = <b>Voy a examinarle</b>.</p>
<p><i>Vamos a sacarle sangre. Le vamos a poner un suero. Va a sentir un piquete.</i></p>`,
    words: [
      'voy a|I am going to', 'vamos a|we are going to', 'va a|you are going to',
      'sacar sangre|to draw blood', 'poner|to put', 'hacer|to do',
      'revisar|to check', 'examinar|to examine', 'esperar|to wait', 'llamar|to call',
      'ingresar|to admit', 'sentir|to feel'
    ],
    drills: [
      '___ a sacarle sangre. (we)|Vamos|Voy,Va,Van|We are going to draw your blood.',
      'Yo ___ a examinarle.|voy|vamos,va,van|I am going to examine you.',
      'El doctor ___ a venir pronto.|va|voy,vamos,van|The doctor is going to come soon.',
      'Le vamos a ___ un suero. (put in)|poner|hacer,sacar,ir|We are going to start an IV.',
      'Vamos a ___ una tomografía. (do)|hacer|poner,sacar,ir|We are going to do a CT scan.',
      'Usted va a ___ aquí unos minutos. (wait)|esperar|llamar,sacar,poner|You are going to wait here a few minutes.',
      'Vamos a ___ a su familia. (call)|llamar|esperar,poner,ingresar|We are going to call your family.',
      'Lo vamos a ___ en el hospital. (admit)|ingresar|llamar,esperar,sacar|We are going to admit you to the hospital.'
    ],
    sentences: [
      'Voy a revisarle el abdomen.|I am going to check your abdomen.',
      'Vamos a sacarle sangre.|We are going to draw your blood.',
      'Le vamos a poner un suero.|We are going to start an IV.',
      'El doctor va a venir pronto.|The doctor is going to come soon.',
      'Va a sentir un piquete.|You are going to feel a pinch.'
    ]
  },
  {
    id: 'tests', track: 'medical', icon: '🧪', title: 'Tests & Procedures',
    tip: `
<p>Tell people what's coming before you do it: <i>Le voy a tomar la presión.</i></p>
<p><b>el suero</b> = IV fluids (patients call the whole IV "el suero"). <b>el piquete</b> = poke / needle stick.</p>
<p>NPO: <b>No coma ni beba nada.</b></p>
<p>Before MRI: <i>¿Tiene algún metal en el cuerpo? ¿Marcapasos?</i></p>`,
    words: [
      'el análisis de sangre|blood test', 'la muestra de orina|urine sample',
      'la radiografía|X-ray', 'la tomografía|CT scan', 'la resonancia|MRI',
      'el ultrasonido|ultrasound', 'el electrocardiograma|EKG', 'el suero|IV fluids',
      'la aguja|the needle', 'la inyección|the injection', 'el piquete|the poke',
      'los resultados|the results', 'la presión arterial|blood pressure',
      'el pulso|the pulse', 'la temperatura|the temperature', 'la sonda|the catheter'
    ],
    sentences: [
      'Necesitamos una muestra de orina.|We need a urine sample.',
      'Orine en este vasito.|Urinate in this cup.',
      'No coma ni beba nada.|Don\'t eat or drink anything.',
      'Le voy a tomar la presión.|I am going to take your blood pressure.',
      'Los resultados tardan una hora.|The results take an hour.',
      'Le vamos a hacer una tomografía.|We are going to do a CT scan.',
      '¿Tiene algún metal en el cuerpo?|Do you have any metal in your body?'
    ]
  },
  {
    id: 'comfort', track: 'medical', icon: '🤝', title: 'Comfort & Reassurance',
    tip: `
<p>A few warm phrases build trust fast. Use them often.</p>
<p><b>Ahorita</b> (Mexico) = right now / in a bit. <b>Ahorita regreso</b> = I'll be right back.</p>
<p><b>la cobija</b> (Mexico, Central America) = <i>la manta</i> (Spain) = blanket.</p>
<p>Avoid promising outcomes. Instead of "everything will be fine", say <i>Vamos a cuidarle bien</i> (we'll take good care of you).</p>`,
    words: [
      'no se preocupe|don\'t worry', 'entiendo|I understand', 'lo siento mucho|I\'m very sorry',
      'despacio|slowly', 'un momento|one moment', 'ahorita regreso|I\'ll be right back',
      '¿Está cómodo?|Are you comfortable?', 'la cobija|the blanket', 'la almohada|the pillow',
      'el botón|the button', 'con cuidado|carefully', 'la pregunta|the question'
    ],
    sentences: [
      'No se preocupe, estamos aquí para ayudarle.|Don\'t worry, we are here to help you.',
      'Lo siento mucho.|I am very sorry.',
      '¿Necesita una cobija?|Do you need a blanket?',
      'Si necesita algo, apriete este botón.|If you need something, press this button.',
      'Ahorita regreso.|I\'ll be right back.',
      '¿Tiene alguna pregunta?|Do you have any questions?',
      'Vamos a cuidarle bien.|We are going to take good care of you.',
      'Respire despacio.|Breathe slowly.'
    ]
  },
  {
    id: 'discharge', track: 'medical', icon: '🏠', title: 'Diagnosis & Discharge',
    tip: `
<p><b>dar de alta</b> = to discharge. <b>internar / ingresar</b> = to admit.</p>
<p>Dosing: <i>cada ocho horas</i> (every 8 hours), <i>dos veces al día</i> (twice a day), <i>con comida</i> (with food), <i>por siete días</i> (for 7 days).</p>
<p>Return precautions: <b>Regrese si...</b> (come back if...).</p>
<p>Use <b>teach-back</b>: <i>¿Me puede explicar cómo va a tomar la medicina?</i></p>`,
    words: [
      'el diagnóstico|the diagnosis', 'la infección|the infection',
      'el antibiótico|the antibiotic', 'cada ocho horas|every eight hours',
      'dos veces al día|twice a day', 'con comida|with food', 'dar de alta|to discharge',
      'internar|to admit', 'la cita|the appointment', 'la farmacia|the pharmacy',
      'regresar|to come back', 'los síntomas|the symptoms', 'el reposo|rest',
      'los líquidos|fluids', 'la clínica|the clinic'
    ],
    sentences: [
      'Usted tiene una infección.|You have an infection.',
      'Tome este antibiótico cada ocho horas.|Take this antibiotic every eight hours.',
      'Tome la medicina con comida.|Take the medicine with food.',
      'Hoy le damos de alta.|Today we are discharging you.',
      'Lo vamos a internar.|We are going to admit you.',
      'Haga una cita con su médico.|Make an appointment with your doctor.',
      'Regrese si tiene fiebre o más dolor.|Come back if you have fever or more pain.',
      'Tome muchos líquidos y descanse.|Drink lots of fluids and rest.',
      '¿Me puede explicar cómo va a tomar la medicina?|Can you explain to me how you are going to take the medicine?'
    ]
  }
];

/*
 * Role-play conversations.
 *   {d: instruction, a: correct Spanish, w: [wrong options]}   your turn
 *   {p: patient's Spanish, en: meaning, w: [wrong English meanings]}  patient turn
 */
window.SCENARIOS = [
  {
    id: 'triage', icon: '📝', title: 'Triage Intake', after: 'questions',
    desc: 'A woman walks up to triage. Get her name, date of birth and why she came.',
    turns: [
      { d: 'Greet her (afternoon) and ask how you can help.', a: 'Buenas tardes. ¿En qué le puedo ayudar?', w: ['Buenas noches. ¿Dónde está el baño?', 'Adiós. ¿Cuántos años tiene?'] },
      { p: 'Buenas tardes. Me duele mucho la cabeza.', en: 'Good afternoon. My head hurts a lot.', w: ['Good afternoon. My stomach hurts a little.', 'Good night. I have a headache since last year.'] },
      { d: 'Ask her name.', a: '¿Cómo se llama?', w: ['¿Cómo está?', '¿Cuándo empezó?'] },
      { p: 'Me llamo María López.', en: 'My name is María López.', w: ['I am María\'s mother.', 'I am calling María López.'] },
      { d: 'Ask her date of birth.', a: '¿Cuál es su fecha de nacimiento?', w: ['¿Cuál es su número de teléfono?', '¿Cuántas veces?'] },
      { p: 'El quince de marzo de mil novecientos ochenta.', en: 'March 15th, 1980.', w: ['May 5th, 1990.', 'March 50th, 1918.'] },
      { d: 'Ask when it started.', a: '¿Cuándo empezó?', w: ['¿Quién es usted?', '¿Dónde vive?'] },
      { p: 'Empezó anoche, y ahora veo un poco borroso.', en: 'It started last night, and now my vision is a little blurry.', w: ['It started this morning, and now I feel better.', 'It started last week, and I have a fever.'] },
      { d: 'Ask if she is allergic to any medication.', a: '¿Es alérgica a algún medicamento?', w: ['¿Es usted la enfermera?', '¿Toma alcohol?'] },
      { p: 'No, no tengo alergias.', en: 'No, I don\'t have allergies.', w: ['Yes, I\'m allergic to penicillin.', 'I don\'t know.'] },
      { d: 'Tell her to wait here a few minutes; the doctor is coming soon.', a: 'Espere aquí unos minutos. El doctor va a venir pronto.', w: ['Váyase a casa. No hay doctor.', 'Acuéstese boca abajo. Le vamos a dar de alta.'] }
    ]
  },
  {
    id: 'chest', icon: '❤️', title: 'Chest Pain', after: 'pain',
    desc: 'A 58-year-old man has chest pain. Take an OPQRST history.',
    turns: [
      { d: 'Introduce yourself as the doctor and ask his name.', a: 'Hola, soy el doctor Ruiz. ¿Cómo se llama?', w: ['Hola, soy el paciente. ¿Dónde está?', 'Adiós, doctor. Hasta luego.'] },
      { p: 'Me llamo Roberto Hernández.', en: 'My name is Roberto Hernández.', w: ['I am from Honduras.', 'I\'m calling my wife.'] },
      { d: 'Ask what is wrong.', a: '¿Qué le pasa?', w: ['¿Qué hora es?', '¿Cuántos años tiene?'] },
      { p: 'Tengo un dolor muy fuerte en el pecho.', en: 'I have a very strong pain in my chest.', w: ['I have a strong headache.', 'My back hurts a little.'] },
      { d: 'Ask when the pain started.', a: '¿Cuándo empezó el dolor?', w: ['¿Dónde vive?', '¿Qué lo mejora?'] },
      { p: 'Empezó hace una hora, cuando estaba trabajando.', en: 'It started an hour ago, while I was working.', w: ['It started yesterday at home.', 'It started a week ago, when I ate.'] },
      { d: 'Ask what the pain is like.', a: '¿Cómo es el dolor?', w: ['¿Cómo se llama?', '¿Dónde está el baño?'] },
      { p: 'Es como una presión, como si tuviera algo pesado en el pecho.', en: 'It\'s like pressure, as if I had something heavy on my chest.', w: ['It\'s sharp, like a knife.', 'It burns when I eat.'] },
      { d: 'Ask if the pain goes anywhere else.', a: '¿El dolor se va a otra parte?', w: ['¿El dolor empezó ayer?', '¿Tiene dolor de cabeza?'] },
      { p: 'Sí, se me corre al brazo izquierdo y a la mandíbula.', en: 'Yes, it spreads to my left arm and jaw.', w: ['No, it stays in one place.', 'Yes, to my back and right leg.'] },
      { d: 'Ask how bad it is from zero to ten.', a: 'Del cero al diez, ¿cuánto le duele?', w: ['¿Cuántos hijos tiene?', '¿Qué hora es?'] },
      { p: 'Un ocho. Y me falta el aire.', en: 'An eight. And I\'m short of breath.', w: ['A three. And I feel fine.', 'An eight. And I have diarrhea.'] },
      { d: 'Ask if he has diabetes or high blood pressure.', a: '¿Tiene diabetes o presión alta?', w: ['¿Tiene hambre o sed?', '¿Tiene hijos o hermanos?'] },
      { p: 'Tengo la presión alta y fumo un paquete al día.', en: 'I have high blood pressure and I smoke a pack a day.', w: ['I have diabetes and I don\'t smoke.', 'I don\'t have any health problems.'] },
      { d: 'Tell him you are going to do an EKG.', a: 'Le vamos a hacer un electrocardiograma.', w: ['Le vamos a dar de alta.', 'Le vamos a poner un yeso.'] },
      { d: 'Reassure him.', a: 'No se preocupe, estamos aquí para ayudarle.', w: ['No entiendo. Adiós.', 'Usted tiene que esperar mañana.'] }
    ]
  },
  {
    id: 'abd', icon: '🫃', title: 'Abdominal Pain', after: 'history',
    desc: 'A 34-year-old woman with belly pain and vomiting.',
    turns: [
      { d: 'Ask where it hurts.', a: '¿Dónde le duele?', w: ['¿Cuándo le duele?', '¿Quién le duele?'] },
      { p: 'Aquí, en la parte de abajo, del lado derecho.', en: 'Here, in the lower part, on the right side.', w: ['Here, at the top, on the left side.', 'All over my back.'] },
      { d: 'Ask if she has nausea or has vomited.', a: '¿Tiene náuseas? ¿Ha vomitado?', w: ['¿Tiene frío? ¿Ha comido?', '¿Tiene tos? ¿Ha fumado?'] },
      { p: 'Sí, vomité dos veces esta mañana.', en: 'Yes, I vomited twice this morning.', w: ['No, I haven\'t vomited.', 'Yes, I vomited ten times last night.'] },
      { d: 'Ask if she has a fever.', a: '¿Tiene fiebre?', w: ['¿Tiene hijos?', '¿Tiene hambre?'] },
      { p: 'Creo que sí. Tengo escalofríos.', en: 'I think so. I have chills.', w: ['No, I feel hot.', 'I don\'t know what that is.'] },
      { d: 'Ask when her last period was.', a: '¿Cuándo fue su última regla?', w: ['¿Cuándo fue su última comida?', '¿Cuándo fue su última vacuna?'] },
      { p: 'Hace tres semanas.', en: 'Three weeks ago.', w: ['Three days ago.', 'Three months ago.'] },
      { d: 'Ask if there is any chance she is pregnant.', a: '¿Hay posibilidad de que esté embarazada?', w: ['¿Hay posibilidad de que esté cansada?', '¿Hay sangre en el vómito?'] },
      { p: 'No creo, pero no estoy segura.', en: 'I don\'t think so, but I\'m not sure.', w: ['Yes, I\'m four months pregnant.', 'No, I\'m sure I\'m not.'] },
      { d: 'Tell her you need a urine sample.', a: 'Necesitamos una muestra de orina.', w: ['Necesitamos una muestra de sangre en la orina.', 'Necesita ir a su casa.'] },
      { d: 'Tell her not to eat or drink anything.', a: 'No coma ni beba nada, por favor.', w: ['Coma mucho, por favor.', 'Tome muchos líquidos, por favor.'] },
      { d: 'Tell her you are going to do an ultrasound.', a: 'Le vamos a hacer un ultrasonido.', w: ['Le vamos a poner un yeso.', 'Le vamos a dar de alta.'] }
    ]
  },
  {
    id: 'peds', icon: '🧒', title: 'Child with Fever', after: 'womenpeds',
    desc: 'A mother brings in her 2-year-old son with fever.',
    turns: [
      { d: 'Ask the mom what happened.', a: '¿Qué le pasó al niño?', w: ['¿Qué hora es, señora?', '¿Dónde trabaja el niño?'] },
      { p: 'Tiene fiebre desde hace dos días y no quiere comer.', en: 'He has had a fever for two days and doesn\'t want to eat.', w: ['He fell two days ago and hurt his arm.', 'He has been eating a lot for two days.'] },
      { d: 'Ask how high the fever was.', a: '¿Qué tan alta fue la fiebre?', w: ['¿Qué tan grande es el niño?', '¿Cuántos años tiene usted?'] },
      { p: 'Treinta y nueve y medio.', en: 'Thirty-nine and a half.', w: ['Thirty-five.', 'Ninety-nine.'] },
      { d: 'Ask if she gave him anything for the fever.', a: '¿Le dio algo para la fiebre?', w: ['¿Le dio de comer al perro?', '¿Le duele algo a usted?'] },
      { p: 'Sí, le di Tylenol hace cuatro horas.', en: 'Yes, I gave him Tylenol four hours ago.', w: ['No, I didn\'t give him anything.', 'Yes, I gave him antibiotics yesterday.'] },
      { d: 'Ask how many wet diapers today.', a: '¿Cuántos pañales mojados hoy?', w: ['¿Cuántos hermanos tiene?', '¿Cuántas veces comió ayer?'] },
      { p: 'Solo dos, y está muy irritable.', en: 'Only two, and he is very fussy.', w: ['About eight, and he is calm.', 'None, and he is sleeping well.'] },
      { d: 'Ask if his vaccines are up to date.', a: '¿El niño tiene sus vacunas al día?', w: ['¿El niño tiene sus juguetes?', '¿El niño tiene seguro médico?'] },
      { p: 'Sí, tiene todas sus vacunas.', en: 'Yes, he has all his vaccines.', w: ['No, he has never been vaccinated.', 'I don\'t know, his dad knows.'] },
      { d: 'Tell her you are going to examine him.', a: 'Lo voy a examinar ahora.', w: ['Lo voy a dar de alta ahora.', 'Voy a llamar a su papá.'] },
      { d: 'Tell her to give him lots of fluids.', a: 'Dele muchos líquidos.', w: ['No le dé nada de agua.', 'Dele mucha comida picante.'] }
    ]
  },
  {
    id: 'fall', icon: '🦴', title: 'Fall from a Ladder', after: 'trauma',
    desc: 'A construction worker fell from a ladder and hurt his wrist.',
    turns: [
      { d: 'Ask what happened.', a: '¿Qué pasó?', w: ['¿Qué quiere?', '¿Qué hora es?'] },
      { p: 'Me caí de la escalera en el trabajo.', en: 'I fell off the ladder at work.', w: ['I fell down the stairs at home.', 'A car hit me at work.'] },
      { d: 'Ask if he hit his head.', a: '¿Se golpeó la cabeza?', w: ['¿Se lavó la cabeza?', '¿Le duele la mano?'] },
      { p: 'No, caí sobre la mano derecha.', en: 'No, I fell on my right hand.', w: ['Yes, I hit my head hard.', 'No, I fell on my left foot.'] },
      { d: 'Ask if he lost consciousness.', a: '¿Perdió el conocimiento?', w: ['¿Perdió su teléfono?', '¿Perdió peso?'] },
      { p: 'No, nunca.', en: 'No, never.', w: ['Yes, for five minutes.', 'I don\'t remember.'] },
      { d: 'Ask him to move his fingers.', a: 'Mueva los dedos, por favor.', w: ['Mueva las piernas, por favor.', 'Abra la boca, por favor.'] },
      { p: 'Ay, me duele mucho la muñeca.', en: 'Ow, my wrist hurts a lot.', w: ['Ow, my elbow hurts a little.', 'It doesn\'t hurt at all.'] },
      { d: 'Tell him you are going to take an X-ray.', a: 'Vamos a tomar una radiografía.', w: ['Vamos a tomar un café.', 'Vamos a sacarle sangre.'] },
      { d: 'Ask when his last tetanus shot was.', a: '¿Cuándo fue su última vacuna del tétano?', w: ['¿Cuándo fue su último día de trabajo?', '¿Cuándo fue su última regla?'] },
      { p: 'No me acuerdo. Hace muchos años.', en: 'I don\'t remember. Many years ago.', w: ['Last month.', 'I have never had one.'] },
      { d: 'Tell him he has a fracture and needs a splint.', a: 'Tiene una fractura. Necesita una férula.', w: ['No tiene nada. Váyase a casa.', 'Tiene una infección. Necesita puntos.'] }
    ]
  },
  {
    id: 'sob', icon: '🫁', title: 'Shortness of Breath', after: 'emerg',
    desc: 'An older woman with asthma who can\'t catch her breath.',
    turns: [
      { d: 'Ask if she is short of breath.', a: '¿Le falta el aire?', w: ['¿Le falta dinero?', '¿Le duele el pie?'] },
      { p: 'Sí... no puedo respirar bien.', en: 'Yes... I can\'t breathe well.', w: ['No, I breathe fine.', 'Yes... I can\'t sleep well.'] },
      { d: 'Ask if she uses an inhaler.', a: '¿Usa inhalador?', w: ['¿Usa lentes?', '¿Usa drogas?'] },
      { p: 'Sí, para el asma. Lo usé cuatro veces hoy.', en: 'Yes, for asthma. I used it four times today.', w: ['No, I don\'t have asthma.', 'Yes, but I left it at home last week.'] },
      { d: 'Ask if she has a fever or a cough.', a: '¿Tiene fiebre o tos?', w: ['¿Tiene frío o calor?', '¿Tiene hijos o nietos?'] },
      { p: 'Tengo tos con flema verde desde hace tres días.', en: 'I\'ve had a cough with green phlegm for three days.', w: ['I have a dry cough since today.', 'I had a fever three weeks ago.'] },
      { d: 'Tell her you are going to give her oxygen.', a: 'Le vamos a poner oxígeno.', w: ['Le vamos a poner un yeso.', 'Le vamos a dar de alta.'] },
      { d: 'Ask her to take a deep breath.', a: 'Respire profundo, por favor.', w: ['No respire, por favor.', 'Saque la lengua, por favor.'] },
      { d: 'Tell her you are going to listen to her lungs.', a: 'Voy a escuchar sus pulmones.', w: ['Voy a escuchar la radio.', 'Voy a mirar sus ojos.'] },
      { d: 'Tell her to stay calm and breathe slowly.', a: 'Tranquila, respire despacio.', w: ['Rápido, respire rápido.', 'Tranquila, no se mueva nunca.'] }
    ]
  },
  {
    id: 'dc', icon: '🏠', title: 'Discharge Instructions', after: 'discharge',
    desc: 'Discharge a man with a urinary infection, with antibiotics and return precautions.',
    turns: [
      { d: 'Tell him he has a urinary infection.', a: 'Usted tiene una infección de orina.', w: ['Usted tiene una fractura de orina.', 'Usted tiene un infarto.'] },
      { p: '¿Es grave, doctor?', en: 'Is it serious, doctor?', w: ['Is it contagious, doctor?', 'Can I go home, doctor?'] },
      { d: 'Tell him it is not serious, but he needs antibiotics.', a: 'No es grave, pero necesita antibióticos.', w: ['Es muy grave, necesita cirugía.', 'No es nada, no necesita nada.'] },
      { d: 'Tell him to take the antibiotic every twelve hours for seven days.', a: 'Tome el antibiótico cada doce horas por siete días.', w: ['Tome el antibiótico cada siete horas por doce días.', 'Tome el antibiótico una vez al mes.'] },
      { p: '¿Lo tomo con comida?', en: 'Do I take it with food?', w: ['Do I take it with alcohol?', 'Do I eat before bed?'] },
      { d: 'Tell him yes, with food, and to drink lots of fluids.', a: 'Sí, con comida. Y tome muchos líquidos.', w: ['No, nunca con comida. Y no tome agua.', 'Sí, con cerveza.'] },
      { d: 'Tell him to come back if he has fever or more pain.', a: 'Regrese si tiene fiebre o más dolor.', w: ['Regrese mañana a trabajar.', 'No regrese nunca.'] },
      { d: 'Ask him to explain how he will take the medicine.', a: '¿Me puede explicar cómo va a tomar la medicina?', w: ['¿Me puede dar su medicina?', '¿Me puede llamar mañana?'] },
      { p: 'Una pastilla cada doce horas, con comida, por siete días.', en: 'One pill every twelve hours, with food, for seven days.', w: ['Two pills every seven hours, without food.', 'One pill a day for twelve days.'] },
      { d: 'Tell him "Perfect. Take care."', a: 'Perfecto. Cuídese mucho.', w: ['Perfecto. Hasta nunca.', 'Mal. Regrese ahora.'] }
    ]
  }
];
