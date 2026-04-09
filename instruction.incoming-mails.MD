
### 1.  TECHNICAL STACK
1. Layered (Repository, Service, Controller, Validation, Route)
2. orm prisma database postgresql
3. ikutin existing yang sudah ada

### 2. incoming-mails
1. surat masuk pada aplikasi ruwang arsip berisikan data surat masuk dan juga data dispositions, tapi ada jg surat masuk tanpa disposisi,
2. saya mau disposisi diambil dari user karna di table user ada division, skrng yang saya buat dari table dispositions master 
3. setelah surat masuk terbuat dan diposisi dilakukan penerima akan mendapatkan surat tersebut, dan penerima bisa mendisposisikan surat jika surat yang diposisikan kepadanya harus di disposisikan ke divisi lain atau user lain atau jika surat tersebut sudah selesai maka penerima bisa menandai surat tersebut selesai
4. apa bila surat masuk sudah selesai maka surat masuk tersebut tidak bisa di disposisikan lagi

### 3. endpoint menus
1. di dalam table menus ada beberapa field diantaranya 
2. name
3. icon
4. parent
5. children
6. url
7. order

jadi contoh menu nya begini 
 - Management Surat
   - Kelola Surat
      - Surat Masuk
      - Surat Keluar
      - Memorandum
      - Laporan Persuratan
   - Cetak Dokumen
 - Arsip Digital
   - Input Dokumen
   - Ruang Arsip
     - Pengajuan Disposisi

kurang lebih seperti itu

### 4. rbac 
1. saya sudah membuat role endpoint
2. saya mau untuk role bisa akses menu apa saja dan actionnya apa saja

### 5. endpoint digital-documents
1. buatkan tabelnya digital_documents
2. di dalam tablenya ada field
   - storage_id
   - resrtice_document (boolean)
   - document_type_id
   - document_number
   - document_name
   - description
   - file
   - status
   - created_by
   - updated_by
   - deleted_by
   - created_at
   - updated_at
   - deleted_at
3. buatkan endpoint crud untuk digital-documents

### 6. endpoint outgoing-mails
1. buatkan table outgoing_mails
2. di dalamnya berisikan field
   - name
   - send_date
   - address
   - mail_number
   - file
   - status
   - created_by
   - updated_by
   - deleted_by
   - created_at
   - updated_at
   - deleted_at
3. untuk file dengan base64
4.  buatkan endpoint crud untuk outgoing-mails
