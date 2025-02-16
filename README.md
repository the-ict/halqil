    # Halqil Backend

Halqil - bu dasturchilar uchun yaratilgan platforma bo'lib, u yerda foydalanuvchilar dasturlash bilan bog'liq muammolarni muhokama qilishlari, savollar berishlari va javob olishlari mumkin.

Bu repository **Halqil** platformasining **backend** qismi uchun bo‘lib, **Node.js**, **Express**, va **MongoDB** yordamida ishlab chiqilgan.

## 📌 Xususiyatlar

- 🔹 **Foydalanuvchi autentifikatsiyasi** – Ro'yhatdan o'tish, tizimga kirish va JWT token orqali autentifikatsiya qilish
- 🔹 **Postlar yaratish, o‘chirish va tahrirlash** – Foydalanuvchilar dasturlash muammolarini post sifatida joylashlari mumkin
- 🔹 **Fikr qoldirish** – Postlarga sharh qoldirish imkoniyati
- 🔹 **Muhokama qilish** – Foydalanuvchilar o‘zaro fikr almashishlari mumkin
- 🔹 **Profilni o‘zgartirish** – Har bir foydalanuvchi o‘z profilini tahrirlashi mumkin
- 🔹 **Qidiruv funksiyasi** – Mavjud postlarni qidirish imkoniyati

## 🔧 O‘rnatish

Loyihani lokal kompyuteringizda ishga tushirish uchun quyidagi amallarni bajaring:

```bash
# Repozitoriyani klonlash
git clone https://github.com/the-ict/Halqil-backend.git

# Loyihaga kirish
cd Halqil-backend

# Kerakli kutubxonalarni o‘rnatish
npm install
```

## ⚙️ Konfiguratsiya

**.env** fayl yaratib, quyidagi konfiguratsiyani qo‘shing:

```
PORT=8800
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🚀 Serverni ishga tushirish

Lokal serverni ishga tushirish uchun quyidagi buyruqdan foydalaning:

```bash
npm start
```

Yoki `nodemon` bilan avtomatik qayta yuklash:

```bash
npm run dev
```

Server `http://localhost:8800` da ishlaydi.

## 📡 API Yo‘nalishlari (Routes)

### 🔐 Autentifikatsiya

| Yo‘nalish | Metod | Tavsif |
|-----------|-------|--------|
| `/api/auth/signup` | `POST` | Foydalanuvchi ro‘yxatdan o‘tadi |
| `/api/auth/signin` | `POST` | Foydalanuvchi tizimga kiradi |

### 📝 Postlar

| Yo‘nalish | Metod | Tavsif |
|-----------|-------|--------|
| `/api/problem` | `GET` | Barcha postlarni olish |
| `/api/problem/:id` | `GET` | Bitta postni olish |
| `/api/problem` | `POST` | Yangi post yaratish |
| `/api/problem/:id` | `PUT` | Postni yangilash |
| `/api/problem/:id` | `DELETE` | Postni o‘chirish |

### 💬 Fikrlar (Comments)

| Yo‘nalish | Metod | Tavsif |
|-----------|-------|--------|
| `/api/comment/:postId` | `GET` | Postga tegishli barcha fikrlarni olish |
| `/api/comment/:postId` | `POST` | Fikr qoldirish |
| `/api/comment/:id` | `DELETE` | Fikrni o‘chirish |

## 💡 Hissa qo‘shish

Agar siz loyihani yaxshilashni xohlasangiz, quyidagi amallarni bajaring:

1. Repozitoriyani **fork** qiling
2. O‘zingizning o‘zgarishlaringizni bajaring
3. **Pull request** yuboring

## 📞 Aloqa

Agar sizda biron-bir savol yoki taklif bo‘lsa, quyidagi manzillar orqali bog‘lanishingiz mumkin:

- **Email**: dvltinv@gmail.com
- **Telegram**: @use_ict

---

**Halqil** - bilim almashish va dasturlashdagi muammolarni hal qilish uchun platforma! ✨

