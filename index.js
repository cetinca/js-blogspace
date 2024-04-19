const baseUrl = "https://apis.scrimba.com/jsonplaceholder"

const blogList = document.getElementById("blog-list")
const form = document.getElementById("new-post")
const postTitle = document.getElementById("post-title")
const postBody = document.getElementById("post-body")

const blogData = []

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const data = {title: postTitle.value, body: postBody.value}
  fetch(baseUrl + "/posts", {
    method: "post",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  })
    .then(response => response.json())
    .then(data => {
      form.reset()
      blogData.unshift(data)
      renderBlogs(blogData)
    })
})

function renderBlogs(blogs) {
  blogList.innerHTML = ""
  blogs.map(blog => {
    const title = document.createElement("p")
    title.textContent = blog.title
    title.className = "title"

    const body = document.createElement("p")
    body.textContent = blog.body
    body.className = "body"

    const hr = document.createElement("hr")

    const div = document.createElement("div")
    div.id = blog.id
    div.append(title)
    div.append(body)
    div.append(hr)

    blogList.append(div)
  })
}


fetch(baseUrl + "/posts", { method: "get" })
  .then(response => response.json())
  .then(data => {
    const blogs = data.slice(0, 3)
    blogs.map(blog => {
      blogData.push(blog)
    })
    renderBlogs(blogData)
  })
