# ✨ Asystent Kolędowy 💸

Asystent Kolędowy to nowoczesna aplikacja internetowa do zarządzania ofiarami z wizyt duszpasterkich.
Umożliwia zapisywanie kolęd, liczenie odwiedzonych domów oraz automatyczne
podsumowanie zebranych ofiar - wszystko lokalnie w przeglądarce.

Aplikacja powstała z użyciem ***Gemini*** od **Google** (konkretnie *`Gemini 3 Flash Preview`*)
---

## 🛠️ Funkcje

- automatyczne statystyki (suma, liczba kolęd, średnia)
- dodawanie, edycja i usuwanie kolęd
- wybór motywów kolorystycznych
- dane zapisywane w localStorage (pełna prywatność)
- responsywny interfejs

---

## 👥 Dla kogo?

- księża i duszpasterze
- ministranci
- wszyscy, którzy chcą mieć porządek i szybki podgląd danych

---

## 🛠️ Technologie

- ⚡**Vite**
- ⚛️ **React**
- 🟦 **TypeScript**
- 🎨 **Tailwindcss**

---

## 🔐 Bezpieczeństwo i prywatność danych

Aplikacja nie zbiera żadnych danych.
Wszystkie informacje są przechowywane wyłącznie lokalnie
w przeglądarce użytkownika (localStorage), jednak wiąże się
również z pewnymi ograniczeniami i wadami:

- **Brak synchronizacji między urządzeniami**  
  Dane są dostępne tylko na jednym urządzeniu i w jednej przeglądarce.
  Zmiana urządzenia lub przeglądarki powoduje utratę dostępu do zapisanych informacji.

- **Ryzyko utraty danych**  
  Wyczyszczenie danych przeglądarki, tryb prywatny lub reinstalacja przeglądarki
  prowadzą do trwałego usunięcia zapisanych informacji.

- **Brak szyfrowania danych**  
  Dane w `localStorage` są zapisywane w postaci jawnej i mogą zostać odczytane
  przez osoby mające dostęp do urządzenia lub przeglądarki.

- **Brak kontroli dostępu**  
  Każdy użytkownik mający dostęp do przeglądarki może zobaczyć lub zmodyfikować dane.

- **Podatność na ataki XSS**  
  W przypadku wystąpienia podatności typu Cross-Site Scripting,

  złośliwy kod może uzyskać dostęp do danych zapisanych w `localStorage`.

---
