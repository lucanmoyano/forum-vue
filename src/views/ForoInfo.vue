<template>
    <!--<p v-html="content"></p>-->
    <div class="hilos__container"> 
        <div class="hilos__box">

            <sui-loader :active="loading" />

            <div class="_box__button">
                <b-button type="is-primary" size="is-small"  @click="newHilo">
                    Nuevo tema
                </b-button>
             </div>
            

            <div class="_box_hilo" v-for="(hilo, i ) in  data" :key="i">
                <div class="_box_cont" @click="infoHilo(hilo._id)" >
                    <a class="_box_avatar">
                        <img :src="img" class="avatar">
                    </a>
                    <div class="_box_info">
                        <div class="title_info">
                            <a>{{ hilo.title }}</a>
                        </div>
                        <div class="user_info">
                        Creado por - <a>Lucas</a>
                        </div>
                        <div class="box_bottom">
                            <span>{{ Cambiarfecha(hilo.fec_pub) }}</span>
                            <!-- <span >
                                <b-tooltip label="Comentarios" type="is-dark" :animated="false">
                                    <button class="comentarios"><i class='bx bxs-comment'></i> <span>20</span> </button>
                                </b-tooltip>
                            </span> -->
                        </div>
                    </div>
                </div>
            </div>
<!--             
            <sui-message v-for="(hilo, i ) in  data" :key="i">
            <sui-message-header class="hilo" @click="infoHilo(hilo._id)">{{ hilo.title }} </sui-message-header>
                {{ Cambiarfecha(hilo.fec_pub) }}
               
            </sui-message> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            content:'',
            data:'',
            URL:'https://proyecto-foro-prototipo.herokuapp.com/hilo',
            loading:true,
            img:'https://i.imgur.com/rhP4uXl.gif'
        }
    },
    methods:{
        newHilo(){
            this.$router.push({ path: '/editor'}/*, params: { userId } }*/)
        },
        infoHilo(id){
            this.$router.push({ path: `/hilos/${id}`})
        },
        Cambiarfecha(inputDate) { 
          
            var date = new Date(inputDate);
            if (!isNaN(date.getTime())) {
                // Months use 0 index.
                return  date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() +
                '    '+date.toLocaleTimeString();
            }
          
       }
    },
    async mounted() {
        try {
            const response = await axios.get(this.URL);
            this.data = response.data;
            this.loading = false;
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style lang="scss" scoped>
    .hilos__box{
        max-width:50%;
        margin:auto;
        ._box__button{
            margin-top:1.5rem;
            display: flex;
            justify-content: flex-end;
        }
        .hilo{
            cursor:pointer;
        }
    }

    ._box_avatar{
        //padding-top: 1em;
        .avatar{
            border-radius: 10%!important;
            width: 40px;
            height: 40px;
            object-fit: cover;
            object-position: center center;
            float: left;
            margin-top: .3em;
        }
    }

    ._box_hilo{
        border-bottom: 1px solid #ebeef1;
        margin-top: 1em;
        
        ._box_cont{
            cursor:pointer;
            transition: width 200ms;
            padding: 9px;
            //border-left: 3px solid #714DD2;
            //border-bottom-left-radius: 5px;
            &:hover{
                background-color:#ebeef1;
            }
        }
    }

    ._box_info{
        margin-left: 3em;
        position: relative;
        color: #24292e;
        //background-color: #fff;
        border-radius: 6px;
        
        .title_info{
            //padding:0 0 0 0;
            font-size:20px;
            font-weight: bold;
            margin: 0px;
        }
        .user_info{
            margin:0em 1em 1em 0em;
            font-size:12px;
        }
        .box_bottom{
            //display: flex;
            //justify-content: flex-end;
            
            .comentarios{
                align-items: center;
                color: inherit;
                display: inline-flex;
                font-size: 12px;
                height: 26px;
                justify-content: center;
                line-height: 12px;
                padding: 0 8px;
                transition: width 200ms;
                background: transparent;
                border:none;
                cursor:pointer;
                //border: 1px solid #e1e1e1;
                //border-radius: 12px;
                &:hover{
                    color:#714DD2;
                }
            }
            span{ font-size:10px; }
            i{
                font-size:15px;
            }
        }
        
    }
    
    a{
        color: #714DD2;
    }
</style>