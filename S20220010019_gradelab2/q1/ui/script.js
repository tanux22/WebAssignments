document.getElementById("submit").addEventListener("click", ()=>{
    method = document.getElementById("method").value
    url = document.getElementById("url").value
    console.log(url)
    const requestOptions = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(postData)
    };
    fetch(url, requestOptions).then(response => response.text()).then(data => {
        document.getElementById("response").textContent = data
    })
})

document.getElementById("method").addEventListener("change", () => {
    method = document.getElementById("method").value
    if (method == "GET") {
        document.getElementById("request").style.display = "none";
    }
    else {
        document.getElementsByClassName("request-form").style = "height: 500px"
        document.getElementById("request").style.display = "block";
    }
})