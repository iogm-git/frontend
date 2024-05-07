<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">IOGM</h3>

  <p align="center">
    Frontend
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#feature">Feature</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Isi dari project ini adalah kumpulan frontend dari aplikasi IOGM. Bertujuan untuk menampilkan source code yang telah saya buat sebagai bahan pertimbangan. 
 
Berikut ini beberapa bagian dari website aplikasi IOGM : 

IOGM - User adalah aplikasi yang berguna untuk mengelola akun yang akan digunakan di seluruh bagian dari aplikasi Shop dan Code.

IOGM - Shop adalah aplikasi penjualan sederhana. Menjual landing page yang dibangun menggunakan HTML, CSS, Javascript. Jadi ketika sudah berhasil transaksi, maka member yang sudah bayar bisa mendownload zip yang berisi file tersebut.

IOGM - Code adalah aplikasi pembelajaran online tentang programming. Pemberi materi akan menerima pendapatan setelah penerima materi resmi membeli materi tersebut. Dan penerima materi akan mendapatkan sertifikat jika sudah menyelesaikan pembelajaran.

### Feature
1. IOGM - User :
    - Autentikasi : 
      - Frontend = Google (hanya mengambil email kemudian tetap di proses login menggunakan jwt)
      - Backend = Jwt

    - Guest : 
      - Login 
      - Register
      - Reset Password
    
    - Member :
      - Mengelola informasi seperti username , name, foto
      - Menerima email yang berisi kode untuk memvalidasi email
      - Jika sudah terisi email maka bisa memilih pendaftaran/keperluan login untuk shop atau code
      - Selanjutnya akan ada featur validasi nomor handphone via whatsapp
      - Instructor : 
        - Mengelola informasi akun bank Midtrans untuk fitur payout

1. IOGM - Shop :
    - Guest :
      - Melakukan search website berdasarkan nama category, type, dan pagination
      - Melihat details dari website
      
    - Member :
      - User bisa mencoba/melihat view tampilan seluruh landing page, dengan syarat sudah terdaftar sebagai member.
      - Menambahkan landing page ke dalam daftar favorite dan keranjang.
      - Melakukan, melihat, dan mendownload transaksi.
      - Mengunduh file .zip jika sudah membayar.
      - Metode pembayaran menggunakan Midtrans.

2. IOGM - Code :
    - Guest : 
      - Melihat dan search course
      - Verifikasi sertifikat menggunakan id

    - Member :
      - General :
        - Forum diskusi : 
          - Berfungsi untuk melakukan tanya jawab antara instructor dan student secara publik sesuai kategori
          - Filter berdasarkan course
        - Setting :
          - Menyesuaikan data diri seperti tanggal lahir dan alamat
      - Instructor :
        - Profile : Melihat data pribadi
        - Courses : Menampilkan data seluruh course
          - Form : Mengelola data seperti judul, deskripsi, harga dan lainnya
          - Sections : Menampilkan seluruh data dari course 
            - Form : Menentukan bagian dari courses
            - Lessons : Menampilkan seluruh data dari section
              - Form : Mengelola materi yang akan menjadi bagian dari section dan course
        - Questions : Melihat dan menjawab berbagai pertanyaan dari student ke instructor secara private
        - Earnings : Monitoring transaksi dan disbursement
        - Reviews : Menampilkan ulasan kursus dari student
      - Student :
        - Profile : Melihat data pribadi
        - Courses : Menampilkan courses yang diikuti
          - Sections : Melihat bagian dari courses dan progress course yang dipilih
            - Lessons : Materi 
          - Ask : Form tanya secara private ke instructor sesuai course yang diikuti
          - Review : Form ulasan untuk course yang dibeli
        - Stashes : Mengelola course favorite
        - Certificates : Daftar urutan sertifikat jika sudah menyelesaikan course
        - Answers : Melihat jawaban dari instructor
        - Transactions : Melihat dan mengontrol transaksi
          - Paid : Melakukan transaksi / bayar
        - Reviews : Melihat daftar course yang telah di review

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<table style="border-collapse: collapse;">
    <tr>
        <td style="border: none;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="Midtrans Logo" height=35>
        </td>
        <td style="border: none;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMwwPChBecQ2X-TywweLJ45X7qTlvQK6_Ps8AHuvY8oPtGTELbdMYkIckWOmcp0hgrfE&usqp=CAU" alt="Midtrans Logo" height=35>
        </td>
    </tr>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started


1. Clone
   ```sh
   git clone https://github.com/iogm-git/iogm-frontend.git
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- File css tidak saya upload, karena hanya untuk bertujuan menampilkan source code react js saja.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Ilham Rahmat Akbar - ilhamrhmtkbr@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

