# klasemen

Sebuah contoh aplikasi klasemen (scoreboard) berisi daftar pemain yang diurutkan berdasarkan skornya. Cocok untuk digunakan saat event offline, di mana panitia butuh untuk memasukkan data secara manual dan klasemen langsung terpampang untuk dilihat semua pemain.

Dibuat dengan hapi sebagai server dan backend, RethinkDB sebagai databasenya, jQuery dan template dengan handlebars.

## Instalasi:

1. Pasang RethinkDB, pastikan ia telah berjalan dan dapat diakses via browser di localhost:8080
2. Clone repository ini, lalu pindah ke root folder repo dan jalankan `npm install` untuk memasang semua dependensi

## Penggunaan:

- `/input` : memasukkan data ke dalam klasemen
- `/data` : menampilkan data semua pemain
- `/leaderboard` : menampilkan klasemen

## Konfigurasi:

Contoh ini menggunakan beberapa konfigurasi sebagi berikut (yang tentu saja bisa diganti sesuai kebutuhan)

- Nama database: test
- Nama table: klasemen
- Port server: 9386
- Port database: default RethinkDB

## TODO:

Mengganti jQuery yang saat ini digunakan untuk meload klasemen. Perlu mengutilisasi fitur stream pada RethinkDB.

## License:

MIT. Sila periksa file [LICENSE.md](LICENSE.md) untuk informasi lebih lanjut
