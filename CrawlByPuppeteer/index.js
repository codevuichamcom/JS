// const puppeteer = require('puppeteer');

// (async() => {

//     // Mở trình duyệt mới và tới trang của kenh14
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.setDefaultNavigationTimeout(0);
//     await page.goto('http://kenh14.vn');


//     // Chạy đoạn JavaScript trong hàm này, đưa kết quả vào biến article
//     const articles = await page.evaluate(() => {
//         let titleLinks = document.querySelectorAll('.knswli-title > a');
//         titleLinks = [...titleLinks];
//         let articles = titleLinks.map(link => ({
//             title: link.getAttribute('title'),
//             url: link.getAttribute('href')
//         }));
//         return articles;
//     });

//     // In ra kết quả và đóng trình duyệt
//     console.log(articles);
//     await browser.close();
// })();

const puppeteer = require('puppeteer');
const download = require('image-downloader');

(async() => {
    const browser = await puppeteer.launch();
    console.log('Browser openned');
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    const url = 'https://www.instagram.com/groupsweetgirl/?hl=vi';
    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log('Page loaded');

    const imgLinks = await page.evaluate(() => {
        let imgElements = document.querySelectorAll('.KL4Bh > img');
        let imgLinks = [];

        imgElements.forEach(item => {
            imgLinks.push(item.getAttribute('src'));
        });
        // let imgLinks = imgElements.map(i => i.getAttribute('src'));
        return imgLinks;
    });
    console.log(imgLinks);

    // Tải các ảnh này về thư mục hiện tại
    await Promise.all(imgLinks.map(imgUrl => download.image({
        url: imgUrl,
        dest: './images'
    })));

    await browser.close();
})();