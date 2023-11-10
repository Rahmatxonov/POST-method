const form = document.querySelector(".form");
const box = document.querySelector(".box");
const searchInput = document.querySelector(".searchInput");

async function createPost() {
  let title = document.querySelector(".inputTitle").value;
  let textArea = document.querySelector(".textArea").value;

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      title,
      textArea,
      userId: 1,
    }),
  });

  if (response.ok) {
    const newPost = await response.json();
    renderPost(newPost);
  }
}

async function deletePost(postID, postElement) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postID}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    box.removeChild(postElement);
  } else {
    console.log(`${postID} ID nomli postni o'chirishda xatolik ro'y berdi`);
  }
}

function renderPost(post) {
  const postElement = document.createElement("div");
  postElement.id = `post-${post.id}`;
  postElement.innerHTML = `
    <h2>${post.title}</h2>
    <h3>${post.textArea}</h3>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Post";
  postElement.appendChild(deleteBtn);
  box.appendChild(postElement);

  deleteBtn.addEventListener("click", () => {
    deletePost(post.id, postElement);
  });
}

function searchPosts(query) {
  const posts = document.querySelectorAll(".box > div");

  posts.forEach((post) => {
    const postTitle = post.querySelector("h2").textContent.toLowerCase();
    const postContent = post.querySelector("h3").textContent.toLowerCase();
    const searchTerm = query.toLowerCase();

    if (postTitle.includes(searchTerm) || postContent.includes(searchTerm)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await createPost();
  form.reset();
});

searchInput.addEventListener("input", () => {
  searchPosts(searchInput.value);
});
