# klasemen

Sebuah contoh aplikasi klasemen (scoreboard) berisi daftar pemain yang diurutkan berdasarkan skornya. Cocok untuk digunakan saat event offline, di mana panitia butuh untuk memasukkan data secara manual dan klasemen langsung terpampang untuk dilihat semua pemain.

Dibuat dengan [hapi](http://www.hapijs.com) sebagai server dan backend, [RethinkDB](http://www.rethinkdb.com) sebagai databasenya, [jQuery](http://www.jquery.com) dan template dengan [handlebars](http://handlebarsjs.com).

## Instalasi:

1. Pasang RethinkDB, jalankan dengan perintah `rethinkdb`, pastikan ia bisa diakses via browser di localhost:8080
2. Kunjungi Bagian Data Explorer di dashboard RethinkDB yang dikunjungi di langkah 1
3. Buat table baru di database `test` (database default bawaan RethinkDB, bisa diganti dengan database lain), bernama `klasemen`. Gunakan perintah `r.db('test').tableCreate('klasemen')`
4. Isi tabel `klasemen` dengan data dummy `r.table('klasemen').insert({name: "Jimi Hendrix", address: "Seattle" , phone: '08134333619', swing: 8, damage: 3000})`
5. Buat Secondary Index yang digunakan untuk menyortir data berdasarkan jumlah swing dan damage. Data akan diurutkan berdasarkan swing terkecil lalu damage terkecil `r.table("klasemen").indexCreate("swingAndDamage", [r.row("swing"), r.row("damage")]);`
6. Clone repository ini, lalu pindah ke root folder repo dan jalankan `npm install` untuk memasang semua dependensi

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

Mengganti jQuery (*2016 masih pakai jQuery? :P*) yang saat ini digunakan untuk meload klasemen. Perlu mengutilisasi fitur [changefeeds](https://rethinkdb.com/docs/changefeeds/javascript/) pada RethinkDB dan [socket.io](http://www.socket.io) untuk membuat update data secara real-time.

## License:

MIT. Sila periksa file [LICENSE.md](LICENSE.md) untuk informasi lebih lanjut
