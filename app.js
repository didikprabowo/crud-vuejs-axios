new Vue({
    el: '#app',
    data : {
        blogs: [],
        title : ' ',
        adds : true,
        id : ''
    },
    methods : {
        add(){
            axios.post('http://localhost:8080/v1/blog',{
                title : this.title,
                slug : this.title,
                content : this.title
            }).then(res => {
                console.log(res.data)
                this.blogs.push(res.data.data),
                this.title = ''
            })
        },
        remove(blog){
            axios.delete('http://localhost:8080/v1/blog/'+blog.id).then(response => {
              const index = this.blogs.indexOf(blog)
              this.blogs.splice(index,1)
            })
        },
        edit(blog){
          axios.get('http://localhost:8080/v1/blog/'+blog.id).then(res => {
              console.log(res.data.title)
              this.title = res.data.title;
              this.adds = false
              this.id = blog.id
          });
        },
        update(){
          axios.put('http://localhost:8080/v1/blog/'+this.id,{
            title : this.title,
            slug : this.title,
            content : this.title
          }).then(res => {
            axios.get('http://localhost:8080/v1/blog').then((res) => {
                console.log(res.data)
                this.blogs = res.data
            });
          })
        }
    },
    created(){
        axios.get('http://localhost:8080/v1/blog').then((res) => {
            console.log(res.data)
            this.blogs = res.data
        });
    }
})
