### 1. endpoint menus
- Buatkan sample payload dengan parent, parent_id, children, icon, url, order dan name

```json
{
  "name": "Sub Menu Name",
  "parent_id": "7fa2aeb5-430c-4235-905e-bb1234567890",
  "parent": "Parent Menu Name",
  "children": "{}",
  "icon": "LucideFolder",
  "url": "/parent-menu/sub-menu",
  "order": 1
}
```

- buatkan jg sample payload tanpa parent, parent_id children tpi ada icon, url order

```json
{
  "name": "Main Menu Name",
  "icon": "LucideHome",
  "url": "/main-menu",
  "order": 1
}
```

### 3. Revision task endpoint menus
- Jika ada menus memiliki parent_id dan memiliki sub menu ada iconnya lagi seperti apa?
jdi gini misal punya menu 
 - Arsip Digital di dalamnya ada sub menu bernama 
    - Disposisi (ada icon disposisi)
    - dan di dalam sub menu disposisi ada sub menu lagi bernama history disposisi dan ada icon 
    - bagaimana proses pengisian payloadnya

**Jawaban & Proses Pengisian Payload:**
Untuk membuat struktur menu bersarang (nested) hingga level 3 seperti di atas, proses pembuatannya harus dilakukan secara berurutan karena kita membutuhkan `id` dari masing-masing *parent* sebagai `parent_id` untuk anaknya. Struktur tabel database Anda mendukung field `icon` di setiap level, sehingga sub-menu yang berada di kedalaman apa pun tetap bisa memiliki `icon`.

Berikut adalah urutan prosesnya:

**1. Create Level 1: "Arsip Digital" (Main Menu)**
Pertama, kita buat menu utama. Menu utama tidak memiliki `parent_id`.

```json
{
  "name": "Arsip Digital",
  "icon": "LucideArchive",
  "url": "/arsip-digital",
  "order": 1
}
```
*-> Anggap response-nya mengembalikan ID: `UUID-ARSIP-DIGITAL`*

**2. Create Level 2: "Disposisi" (Sub Menu)**
Gunakan ID dari langkah pertama (`UUID-ARSIP-DIGITAL`) sebagai `parent_id`. Kita sertakan nama `parent` dan iconnya.

```json
{
  "name": "Disposisi",
  "parent_id": "UUID-ARSIP-DIGITAL",
  "parent": "Arsip Digital",
  "icon": "LucideSend", 
  "url": "/arsip-digital/disposisi",
  "order": 1
}
```
*-> Anggap response-nya mengembalikan ID: `UUID-DISPOSISI`*

**3. Create Level 3: "History Disposisi" (Sub Sub Menu)**
Gunakan ID dari langkah kedua (`UUID-DISPOSISI`) sebagai `parent_id`. Kita juga sertakan icon-nya di sini!

```json
{
  "name": "History Disposisi",
  "parent_id": "UUID-DISPOSISI",
  "parent": "Disposisi",
  "icon": "LucideHistory",
  "url": "/arsip-digital/disposisi/history",
  "order": 1
}
```

**Kesimpulan:**
Field `icon` itu sejatinya menempel langsung pada baris data `menus`. Tidak terbatas apakah itu *Main Menu*, *Sub Menu 1*, ataupun *Sub Menu 2*. Selama endpoint menerima field `icon` pada JSON Payload, maka tinggal Anda isikan saja di level mana pun yang membutuhkan icon tersebut. Begitu pula field `url`. Hubungan kedalaman hierarkinya hanya diikat oleh nilai `parent_id`.
