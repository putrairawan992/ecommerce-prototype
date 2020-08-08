import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
  id: {
    //topHeader
    topHeader_link: 'kesini',
    topHeader_sentence: 'Terbuka juga untuk pemesanan grosir dengan harga spesial, monggo mampir {0}',
    topHeader_tittle: 'Gratis Ongkir Hingga Rp. 30,000 Dengan Belanja Minimum Rp. 200,000',

    //Header
    search_place_holder: 'cari produk',
    header_greeting: 'Hello, monggo masuk',
    header_greeting_auth: 'Hello, monggo belanja',
    header_my_order: 'Pesenan Saya',
    header_check_order: 'Lacak Pesenan',

    //Category
    category: 'Kategori',

    //Shipping
    shipping_form:'Pengiriman dari :',
    shipping_send_to:'Kirim ke :',
    shipping_estimated_shipping_costs:'Estimasi Biaya Kirim :',

    //Review_Dashboard_Customer
    review_dashboard_quote : "Ulasan hanya boleh kosong atau memiliki minimal 20 karakter",
    review_dashboard_rating : "Pilih bintangnya dulu ",

    //Address
    use_notice_address: 'Gunakan satu alamat sebagai alamat utama untuk pengiriman produk yang dibeli.',
    send_to_another_address: 'Kirim ke Alamat Lain',
    shipping_address: 'Alamat Pengiriman',
    validation_required_address_name: 'Silahkan isi nama alamat',
    validation_required_receiver: 'Silahkan isi nama penerima',
    validation_required_phone_number: 'Silahkan isi no telfon kamu',
    validation_required_province: 'Silahkan pilih alamat provice kamu',
    validation_required_city: 'Silahkan pilih alamat kota kamu',
    validation_required_subdistrict: 'Silahkan pilih alamat kecamatan kamu',
    validation_required_zipcode: 'Silahkan isi kode POS kamu',
    validation_required_full_address: 'Silahkan isi alamat lengkap kamu',

    //Cofirmation activated from email
    confirmation_title_heading: 'Hi, Selamat ya..',
    confirmation_title_content: 'Selamat ya, akun kamu sudah terverifikasi oleh sistem kami, terimakasih sudah melakukan registrasi di monggopesen, kita punya semua produk luar negri yang kamu mau tinggal pesen, kita antar sampai rumah kamu.',
    contirmation_title_footer: 'Hati-hati jangan berikan informasi akun monggopesen anda kepada siapapun.',

    //error-page
    error_bottom_text: "Sepertinya halaman yang anda tuju sedang dalam perbaikan, teknisi kami sedang memperbaikinya silahkan kembali ke halaman sebelumnya atau klik tombol dibawah ini.",
    error_top_text: "Wah, ada apa ya?",
    error_button_text: "Kembali Ke Beranda",
    //general
    preliminary: 'Pendahuluan',
    use_of_cookies: 'Pengunaan Cookie',
    user_choices: 'Pilihan Pengguna',
    storage_and_deletion_of_information: 'Penyimpanan dan Penghapusan Informasi',
    privacy_policy_update: 'Pembaruan Kebijakan Privasi',
    latest_review: 'Ulasan Terbaru',
    order_received: 'Pesanan Diterima',
    start_shopping: 'Mulai Belanja',
    password_required: "Password harus diisi",
    email_valid: "Email harus valid",
    email_quote_required: "Email harus diisi",
    change_address: 'Ubah Alamat',
    password: 'Password',
    profile: 'Profile',
    add_address: 'Tambah Alamat',
    address_me: 'Alamat Saya',
    order_name: 'Nama Pesanan',
    price: 'Harga',
    postage_is_included: 'Ongkir Sudah Termasuk',
    cost_shipment_jne: 'Biaya Kirim JNE',
    cost_shipment_international: 'Biaya Kirim Internasional',
    shipment_via: 'Pengiriman Internasional Via',
    received: 'Terima',
    cancel: 'Batalkan',
    oh_no: 'Oh no!',
    back: 'Kembali',
    cancel_order_by: 'Pesenan dibatalkan oleh',
    buy_again: 'Pesen Lagi',
    stock_empty: 'Stock Kosong',
    estimate_accepted_order: 'Perkiraan barang diterima',
    in_delivery: 'Dalam Proses Pengiriman',
    before_pay: 'Bayar Sebelum',
    pay_now: 'Bayar Sekarang',
    cancel_details: 'Detail Pembatalan',
    total_payment: 'Total Pembayaran',
    log_in: 'Login',
    log_out: 'Log Out',
    monggoPesen: "MonggoPesen",
    add_to_cart: "Tambah Ke Keranjang",
    order_now: "Pesen Sekarang",
    action_delete: "Hapus",
    checkout: "Check Out",
    total_price_product: "Total Harga Barang",
    failed: "Gagal",
    pay: "Bayar",
    total: "Jumlah",
    note: "Catatan",
    variant: 'Variant',
    varian: 'Varian',
    sub_total: "SubTotal",
    real_total: "Total",
    price_product: "Harga Product",
    price_courier: "Ongkos Kirim",
    pcs: "pcs",
    delivery_courier: "Delivery Courier",
    address: "Alamat",
    my_account: 'Akun Saya',
    most_searched: 'Paling Banyak Dicari',
    recommendation_product: 'Rekomendasi Produk',
    cancel_order: 'Cancel Order',
    payment_type: 'Metode Pembayaran',
    pay_to: "Bayar Ke",
    giyarto: "PT. Giyarto Manunggal Sejati",
    estimate_accepted: "Perkiraan Diterima",
    riwayat_order: " Tidak ada Riwayat Pesenan",


    //FormAddAddress
    form_add_shipping_address: 'Tambah Alamat Pengiriman',
    form_change_shipping_address: 'Ubah Alamat Pengiriman',

    //Dashboard Tabs Belum Bayar
    tabs_belum_bayar: 'Anda yakin ingin membatalkan pesenan?',
    tabs_belum_bayar_pesan_batalkan: "Pesenan yang anda buat akan kami batalkan",

    //Dashboard Tabs Dalam pengiriman
    tabs_in_delivery: 'Apa anda yakin sudah menerima pesenan?',
    tabs_in_delivery_message_in_delivery: 'Pastikan anda benar-benar sudah menerima barang pesenan anda sebelum melakukan konfirmasi ini.',

    //Dashboard Akun Saya Ubah Alamat
    tabs_my_account_change_address: 'Apa anda yakin ingin menghapus alamat?',
    tabs_my_account_change_address_paragraph: 'Informasi pada yang tertera pada alamat ini akan kami hapus seluruhnya dari sistem monggopesen.',

    //FailedPaymentPage
    text_failed_payment: 'Sepertinya ada kesalahan di dalam sistem kami, silahkan menunggu beberapa saat dan mencoba kembali.',
    text_cancel_payment: 'Pembayaran anda telah dibatalkan.',

    //NotFoundPage
    not_found_text: ' Halaman Tidak Ditemukan',
    not_found_number: '404',
    not_found_back: 'Maaf, kami tidak bisa menemukan halaman yang anda tuju.',

    //SearchContainer
    paragraph_search: 'Gunakan kata pencarian lain untuk melakukan mencari produk yang anda maksudkan atau masuk ke halaman',
    help_search: 'bantuan pencarian.',
    //Invoice
    text_thanks_invoice: ' Terimakasih sudah berbelanja di monggopesen.com,ini adalah bukti dari transaksi anda',
    text_invoice_infromasi_copy: 'Nomor Virtual Account berhasil di copy, silahkan lanjutkan proses pembayaran.',
    text_sucsess_copy: 'Berhasil di copy',


    //Dashboard Product Details
    notice_payment_administrasi: "Subtotal yang tercantum diatas udah termasuk  biaya bea masuk, pajak dan administrasi.",
    cancel_order_dashboard: "Batalkan Pesenan",

    virtual_account: "Virtual Account",
    copy: "Salin",
    ok: "OK",

    //Best Seller
    best: "Best",
    seller: "Seller",
    see_more: "See more..",


    //Terms & Condition
    terms_condition_modifications_and_terms_conditions: 'Modifikasi Platform dan Syarat & Ketentuan',
    terms_condition_monggopesen_service_order_policy: 'Kebijakan Pemesanan Jasa Monggopesen',
    terms_condition_copyright: 'Hak Cipta',
    terms_condition_shipping_price_calculation: 'Penghitungan Harga Pengiriman',
    terms_condition_proses_custom_clearance: 'Proses Custom Clearance',
    terms_condition_prohibited_items: 'Barang yang Dilarang',
    terms_condition_prohibited_text: 'Barang yang dilarang untuk diperjualbelikan di dalam platform Monggopesen adalah:',
    terms_condition_applicable_law: 'Hukum yang Berlaku',
    terms_condition_electronic_communication: 'Komunikasi elektronik',
    terms_condition_retur_return_label:'Kebijakan Pengembalian Barang (Retur), Pengembalian Dana (Refund) dan Pembatalan (Cancellation)',
    terms_condition_restricted_goods:'Barang yang Dibatasi',
    terms_condition_restricted_items : 'Berikut adalah daftar barang yang dibatasi:',
    terms_condition_restricted_items_heading:'Beberapa barang yang dibatasi dapat dikirim, tapi hanya setelah Monggopesen meninjau produk tersebut untuk memastikan sesuai dengan undang-undang di negara Penjual dan di negara Pembeli.',
    //Checkout 
    checkout_shopping_summary: "Ringkasan Belanja",
    checkout_alert_fill_courier: "isi dulu semua courier pada setiap product",
    order_summary: 'Ringkasan Pesenan',
    order_details: 'Detail Pesenan',
    international_shipping: 'Pengiriman International',
    checkout_total: 'Total',
    choose_payment_methods: 'Pilih Metode Pembayaran',
    checkout_alert_info: 'Sudah Termasuk Biaya Pajak Dll.',
    checkout_alert_description_detail_pesanan: "Harga yang tercantum pada saat check out sudah termasuk pertambahan biaya pajak domestik, pajak import dan lain-lain.",
    checkout_notif_asuransi:' Penambahan asuransi sangat disarankan untuk menjaga produk barang pesanan Anda dari kerusakan / kehilangan selama pengiriman kurir lokal (J&T). Monggopesen tidak bertanggung jawab atas kerusakan / kehilangan barang selama pengiriman kurir lokal (J&T) apabila Anda tidak mengasuransikan barang yang Anda pesan.',
    //Social Media
    google: "Google",
    facebook: "Facebook",

    //enter
    enter: "Masuk",

    //Login
    login_enter: "Masuk sekarang",
    login_option: "atau masuk dengan",
    login_remember_me: "Ingat saya",
    login_forgot_password: "Lupa Password ?",
    login_quote: "{0} jika kamu belum punya akun",
    login_register: "Register",
    //Button
    button_empty_cart: "Ayo Mulai Belanja",
    //Warning
    warning_empty_cart: "Belum ada barang di keranjang belanja kamu",
    warning_unavailable_product: "Oppss..! Maaf, sepertinya product yang anda cari tidak ditemukan",
    //Register
    register_now: "Daftar Sekarang",
    register_quote: "{0} jika kamu sudah punya akun",
    register_option: "atau daftar dengan",
    register_enter: "Masuk",
    register_name: "Nama lengkap harus diisi",
    register_password_quote: "Password harus 6 digit kombinasi angka dan huruf",
    register_password_placeholder: "Password",
    register_sucsess: "Pendaftaran Berhasil Silahkan Cek Email Untuk Aktivasi",
    register_pattern_quote: "Nama hanya boleh berupa huruf, titik (.), underscore (_), dan spasi",
    register_policy: "Kebijakan Privasi",
    register_requirement: "Syarat & Ketentuan",
    register_login: "Log in",
    register_agree: "Dengan melakukan pendaftaran, saya setuju dengan {0} dan {1} monggopesen.com",

    //product detail
    product_detail_description: "Deskripsi Produk",
    delivery_from: "Pengiriman Dari",
    china: "China",
    delivery_to: "ke INDONESIA",
    detail_product: "Detail Produk",
    product_detail_warning_variant_one_item: 'Variant Belum Dipilih',
    product_detail_warning_variant_two_item: 'Variant Belum Dipilih Semua',
    product_detail_info_stock: "Mohon maaf saat ini hanya tersedia {0}",

    //Category
    category_text_result: "Menampilkan {0} produk untuk {1}",

    //Profile
    profile_error_message: "Nama harus diisi minimal 1 karakter",
    profile_status_verifikasi: "Kirim Ulang Email Verifikasi",
    profile_status_sucsess: "Berhasil Mengirim Email Verifikasi",
    profile_status_heading: "Email belum di verfikasi",
    profile_status_text: "Jika tautan pada email yang kami kirim sudah kadaluarsa gunakan tombol kirim ulang dibawah ini.",

    //Payment Info
    payment_info: "Info Pembayaran",
    payment_total_amount: "Total Pembayaran",
    payment_pay_before: "Bayar Sebelum",
    payment_info_sentence: "Gratis Ongkir Hingga Rp. 30,000 Dengan Belanja Minimum Rp. 200,000",
    payment_check: "Cek Status Pembayaran",
    payment_modal_ask: "Sudah selesai bayar?",
    payment_modal_content: "Pembayaran akan terverifikasi secara otomatis dalam 10 menit setelah anda berhasil transfer",


    //footer
    footer_any_help: 'Apa yang bisa kami bantu?',
    how_to_shop: 'Cara Belanja',
    delivery_time: 'Lama Pengiriman',
    how_to_pay: 'Cara Bayar',
    track_the_delivery: 'Lacak Pengiriman',
    contact_us: 'Hubungi Kami',
    about_us: 'Tentang Kami',
    career: 'Karir',
    terms_and_condition: 'Syarat dan Ketentuan',
    privacy_policy: 'Kebijakan Privasi',
    payment: 'Pembayaran',
    follow_us: 'Follow Us',
    monggo: 'Monggo...',
    subscripton_invitation: 'Berlangganan sekarang untuk mendapatkan informasi seputar update, promo dan penawaran menarik lainnya.',
    send: 'Send',
    very_bottom: '2019 Copyright under Monggopesen.com'
  }
})

export default strings;