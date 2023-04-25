// dánh sách cần thực hiện
// 1 render
// 2 Scroll top
// 3 Play / pause / seek
// 4 CD rorate
// 5 Next / prev
// 6 Random
// 7 Next / Repeat when ended
// 8 Active
// 9 Scroll active into view
// 10 Paly song when click

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name:'Hạc Giấy',
            singer:'Yến Napun',
            path:'./music/hacgiay.mp3',
            image:'./img/hacgiay.webp'
        },
          {
            name:'Hạc Giấy',
            singer:'Yến Napun',
            path:'./music/hacgiay.mp3',
            image:'./img/hacgiay.webp'
        },
          {
            name:'Hạc Giấy',
            singer:'Yến Napun',
            path:'./music/hacgiay.mp3',
            image:'./img/hacgiay.webp'
        },
          {
            name:'Hạc Giấy',
            singer:'Yến Napun',
            path:'./music/hacgiay.mp3',
            image:'./img/hacgiay.webp'
        },
          {
            name:'Hạc Giấy',
            singer:'Yến Napun',
            path:'./music/hacgiay.mp3',
            image:'./img/hacgiay.webp'
        },
          {
            name:'Hạc Giấy',
            singer:'Yến Napun',
            path:'./music/hacgiay.mp3',
            image:'./img/hacgiay.webp'
        },
          {
            name:'Hạc Giấy',
            singer:'Yến Napun',
            path:'./music/hacgiay.mp3',
            image:'./img/hacgiay.webp'
        },

    ],
    render: function () {
        const htmls = this.songs.map(song => {
            return `
        <div class="song">
          <div
            class="thumb"
            style="
              background-image: url('${song.image}');
            "></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      </div>`
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    definePropreties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
          }
      })  
    },
    handleEvents: function () {
        const cdWidth = cd.offsetWidth
        
        // xử lý phóng to thu nhỏ CD
        document.onscroll = function () {
        //   console.log(window.scrollY)
            const scrollTop = window.scrollY || document.documentElement.scrollTop // kéo thay đổi CD bên trên 
            const newCdWidth = cdWidth - scrollTop
            console.log(newCdWidth)

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 // set thay đổi width theo newCdWidth khi scroll
                                                // có thể sảy ra lỗi nếu kéo nhanh quá nó sẽ nhảy về số âm -
            // check newCdWidth > 0 thì lấy newCdWidth + 'px'
            // check nếu kéo nhanh quá về âm thì cho nó max = 0

            // => kéo lên nó mờ dần
            cd.style.opacity = newCdWidth / cdWidth //=> làm mờ ảnh dàn
        } 
        
        // xử lý khi click Play
        playBtn.onclick = function () {
            if (app.isPlaying) { // nếu đang dừng lại play
                // app.isPlaying = false
                audio.pause()
                // player.classList.remove('playing')
            } else { // còn nêú phát nhạc thì play
                // app.isPlaying = true
                audio.play()
                // player.classList.add('playing')
            }
        }

        // khi được Play
        audio.onplay = function () {
            app.isPlaying = true
            player.classList.add('playing')
        }
        // khi được Pasue
        audio.onpause = function () {
            app.isPlaying = false
            player.classList.remove('playing')
        }
        //khi tiến độ bài hát thay đối
        audio.ontimeupdate = function () {
            if (audio.duration) {
              const progressPercent = Math.floor(audio.currentTime / audio.duration * 100) 
              progress.value = progressPercent
            }
        }

        // xử lý khi tua
        progress.onchange = function (e) { //=> onchange xử lý khi có sự thay đổi như(tua audio)

            const seekTime = audio.duration / 100 * e.target.value // chia để tính số giây
            audio.currentTime = seekTime
        }
    },
    loadCUrrentSong: function () {
        heading.textContent = this.currentSong.name // lấy tên trong obj // => textContent: thay đổi nội dung text trong element ấy
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`//=> thay đổi ảnh bằng backkis
        audio.src = this.currentSong.path 
    },
    start: function () {
        // định nghĩa các thuộc tính obj
        this.definePropreties()

        // lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // tải thông tin bài hát đầu tiền vào UI khi chạy ứng dụng
        this.loadCUrrentSong()

        // render play list
        this.render() // => duy nhất app.start ko phải gọi nhiều
    },
}

app.start()