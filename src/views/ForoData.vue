<template>
    <div class="container">
        <!-- <b-loading :is-full-page="false" v-model="loading" ></b-loading> -->
        <sui-loader :active="loading"/>
        <div v-if="!loading">
            <Content :content="data" />
            <Comments />
        </div>
        
    </div>
</template>


<script>
import axios from 'axios';
//import AddComment from '@/components/Thread/AddComment';
import Content from '@/components/Thread/Content';
import Comments from '@/components/Thread/Comments';


export default {
    components:{
        //AddComment,
        Comments,
        Content
    },
    data(){
        return{
            URL:'https://proyecto-foro-prototipo.herokuapp.com/hilo',
            data:{
                title:'',
                content:'',
                fonts:[],
            },
            loading:true
        }
    },
    methods:{
        modifyUrl(url) {
            let endpoint = url;
            
            endpoint = endpoint.replace('oembed', 'iframe');
            endpoint = endpoint.replace('url', 'src');
            endpoint = endpoint.replace('watch?v=', 'embed/');
            endpoint = endpoint.replace('oembed', 'iframe');
            
            return endpoint;
        },
        async getContent(){
            try {
                const response = await axios.get(`${this.URL}/${this.$route.params.id}`);
                this.data = response.data;
                this.data.content = this.modifyUrl(this.data.content);
                this.loading=false;
            } catch (error) {
                console.error(error);
            }
        },
    },
    async mounted(){
        await this.getContent();
    }
}
</script>

<style lang="scss" scoped>
    .container{
        width:60%;   
        margin-bottom:4rem;   
        margin:auto;
        min-height:80vh;
    }
</style>