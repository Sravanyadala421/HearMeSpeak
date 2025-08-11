# Hear Me Speak – Project Story

## 🌟 Inspiration
Communication is one of the most fundamental human needs.  
This project was inspired by the real-life story of a person born prematurely in the 7th month of pregnancy who developed severe hearing loss from birth.  
Because they never heard spoken words, they struggled to speak — not due to lack of intelligence or memory, but simply because they never learned how speech sounds.  

This sparked a question in my mind:  
*"Can we use technology to bridge the gap between the brain’s desire to speak and the absence of hearing experience?"*

---

## 🎯 The Problem
- Traditional speech therapy for deaf and hard-of-hearing individuals is slow, expensive, and limited by location.
- Many assistive technologies focus on hearing (hearing aids, cochlear implants) but not directly on learning to speak without hearing.
- There’s a need for a self-paced, visual-feedback-based platform that allows a person to see and practice correct pronunciation.

---

## 💡 The Solution
**Hear Me Speak** — A web-based app that helps non-hearing individuals practice speaking through:
1. **Speech-to-Text (STT) Feedback** – User says a word, app transcribes instantly.
2. **Lip Shape & Mouth Position Guidance** – Visual animations/images of how to form words.
3. **Progress Tracking** – Saves attempts, shows improvement over time.

---

## 🛠 How I Built It
- **Frontend**: React + Tailwind CSS  
- **Speech Recognition**: Browser’s Web Speech API  
- **Mouth Position Guidance**: Preloaded SVG animations  
- **State Management**: React hooks  
- **Deployment**: Vercel / Netlify  

---

## 📚 What I Learned
- Leveraging the **Web Speech API** for real-time transcription
- Mapping phonemes to mouth positions
- Accessibility-first UI design
- Offline-friendly architecture

---

## 🚧 Challenges Faced
1. Speech recognition accuracy – noisy environments cause errors.
2. Mouth tracking – CPU intensive, made optional.
3. User onboarding – minimal clicks, instant mic/webcam detection.

---

## 🔢 Math Behind the Scenes
We measure improvement using a **pronunciation similarity score**:

\[
\text{Score} = \left( 1 - \frac{\text{LevenshteinDistance}(T_e, T_r)}{\max(\text{len}(T_e), \text{len}(T_r))} \right) \times 100
\]

Where:
- \(T_e\) = Expected Text  
- \(T_r\) = Recognized Text  

---

## 🚀 Impact
**Hear Me Speak** aims to break the silence barrier for those who never had the chance to hear.  
It empowers users with self-paced learning, instant feedback, and confidence to speak.

