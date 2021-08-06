var blog_list = [];
function storeData() {
    if (document.getElementById("title").value != "" && document.getElementById("article_content").value != "") {
        var image = "<img src='";
        var image_end = "'>";
        var newBlog = {
            blog_title : document.getElementById("title").value,
            article_content : document.getElementById("article_content").value,
            image : image + document.getElementById("add_image").value + image_end
        }
        blog_list.push(newBlog)
        localStorage.setItem("blog_list", JSON.stringify(blog_list));
    }
}

function displayData() {
    let data = JSON.parse(localStorage.getItem("blog_list" || "[]"));
    JSON.stringify(data);
    document.getElementById("blogs").innerHTML = "";
    data.forEach(entry=>{
        var blog_content = entry.blog_title +"<br>" + entry.article_content + "<br>" + entry.image;
        var blog = document.createElement("h2");
        blog.classList.add("border");
        blog.classList.add("border-primary");
        blog.classList.add("overflow-fix");
        blog.innerHTML += blog_content;
        console.log(entry.blog_title);
        document.getElementById("blogs").appendChild(blog);
    });
}