var images = ['http://www.gettingsmart.com/wp-content/uploads/2017/06/Program-Code-Feature-Image.jpg', 'http://www.predicate.us/wordpress/wp-content/uploads/2017/01/coding.jpg', 'https://assets.entrepreneur.com/content/3x2/1300/20160628101609-Coding.jpeg', 'https://i.amz.mshcdn.com/l_RddH67VXjTvUnmzx_8bNUcSqQ=/950x534/filters:quality(90)/2013%2F04%2F30%2F1e%2Fcodingfutur.d5369.jpg', 'https://solutionsreview.com/mobile-application-development/files/2016/06/coding-and-hacking.jpg'];

var section_1 = document.getElementById("section_1");

var i = 0;

startLooping();

function startLooping() {
    setInterval(loopThroughImages, 3000);
}

function loopThroughImages() {
    section_1.style.backgroundImage = "url" + "(" + images[i] + ")";
    i++;
    if(i >= images.length) {
        i = 0;
    }
}