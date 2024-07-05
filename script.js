const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 2000; // 星の数を増やす
const speed = 3; // 高速でズームするための速度を設定

const colors = ['white', 'yellow', 'blue', 'red'];

function Star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.width;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.move = function() {
        this.z -= speed;
        if (this.z <= 0) {
            this.z = canvas.width;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
    };

    this.show = function() {
        let x, y, rad;
        x = (this.x - canvas.width / 2) * (canvas.width / this.z);
        x = x + canvas.width / 2;

        y = (this.y - canvas.height / 2) * (canvas.width / this.z);
        y = y + canvas.height / 2;

        rad = canvas.width / (1.5 * this.z); // 星のサイズをさらに大きく

        // グラデーションの作成
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, rad);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 1)'); // より明るく
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)'); // 透明度を調整

        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
    };
}

for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // 背景を少し透明に
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].show();
        stars[i].move();
    }
    requestAnimationFrame(animate);
}

animate();
