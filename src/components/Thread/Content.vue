<template>
    <div>
        <div class="_content_container">
            <div class="_content_title"> {{content.title}} </div>
            <div class="user_post">
                <div class="user_content">
                    <div class="user_content_avatar">
                        <img :src="img3">
                    </div>
                    <a>{{user}}</a> 
                    <b-tooltip :label="cambiarfecha(content.fec_pub)" type="is-dark" :animated="false">
                        <div class="_content_fec">{{dateComment(content.fec_pub)}}</div>
                    </b-tooltip>
                </div>

                <div class="header_options_container">
                    <b-tooltip label="Editar" type="is-dark" :animated="false">
                        <a class="header_options" @click="editContent"><i class='bx bxs-edit' ></i></a>
                    </b-tooltip>

                    <b-tooltip label="Eliminar" type="is-dark" :animated="false">
                        <a class="header_options" @click="confirm"><i class='bx bxs-trash-alt' ></i></a>
                    </b-tooltip>
                </div>
                
                
            </div>
            <div>            
                <p class="_box_content" v-html="content.content"></p>
                <div class="_box_font" v-if="content.fonts.length > 0">
                    <p>Fuentes</p> 
                    <ul>
                        <li v-for="(font, i) in content.fonts" :key="i">
                            <a :href="font"  target="_blank">{{font}}</a>
                        </li>
                        
                    </ul>
                </div>
            </div>

            <!-- <div class="_content_etiquetas">
                <p>Etiquetas</p> 
                <ul class="_box_etiquetas">
                    <li class="_etiqueta">uno</li>
                    <li class="_etiqueta">uno</li>
                    <li class="_etiqueta">uno</li>
                    <li class="_etiqueta">uno</li>
                </ul>
            </div> -->
            <div class="_content_footer">
                
                <div class="_box_reaction">
                    <b-tooltip label="Votar positivo" type="is-dark" :animated="false">
                        <a class="reaction_button" id="up"><i class='bx bxs-upvote'></i> 104</a>
                    </b-tooltip>
                    <span id="_s_down">
                        <b-tooltip label="Votar negativo" type="is-dark" :animated="false">
                            <a class="reaction_button" id="down"><i class='bx bxs-downvote' ></i></a>
                        </b-tooltip>
                    </span>
                    <span id="reply">
                        <b-tooltip label="Comentarios" type="is-dark" :animated="false">
                            <button class="reply"><i class='bx bxs-comment'></i> 
                                <span v-if="content.content.length > 0 && content.comments.length > 0" >{{content.comments.length}}</span>                                
                            </button>
                        </b-tooltip>
                    </span>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props:[ 'content', 'title' ],
    data(){
        return{
            URL:'https://proyecto-foro-prototipo.herokuapp.com/hilo/',
            img3:'https://i.imgur.com/rhP4uXl.gif',
            user:'Lucas'
        }
    },
    methods:{
        editContent(){
            this.$router.push({ path: `/hilos/edit/${this.$route.params.id}` })
        },
        confirm() {
                this.$buefy.dialog.confirm({
                    message: 'Seguro quieres eliminar?',
                    cancelText: 'Cancelar',
                    confirmText: 'Confirmar',
                    onConfirm: () => this.deleteContent() 
            })
        },
        async deleteContent(){
            try {
                await axios.delete(`${this.URL}${this.$route.params.id}`)
                this.$buefy.toast.open('Se eliminó correctamente');
                this.$router.push({ path: `/hilos/`})
            } catch (error) {
                console.error(error);
            }
        },
        cambiarfecha(inputDate) { 
            var date = new Date(inputDate);
            var months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            if (!isNaN(date.getTime())) {
                return  date.getDate() + ' ' + (months[date.getMonth()]) +' '+ date.getFullYear() +
            '    '+date.toLocaleTimeString();
            }

        },
        dateComment(inputDate) { 
            const date1 = new Date();
            let date2 = new Date(inputDate);

            if (!isNaN(date2.getTime())) {
                const diffTime = Math.abs(date2 - date1);
                const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

                const hours = Math.round(diffTime / (1000 * 60 * 60));
                const minutes = Math.round((diffTime / 1000)  / 60);
                const weeks = Math.round(days / 7);
                const months = Math.round(weeks / 29);
                const years = Math.round(months / 12);

                let result = null;

                if( minutes < 2 ) 
                    result = 'Hace un momento';
                else if( minutes < 60 )
                    result = 'Hace ' + minutes + ' minutos';
                else if ( hours < 24 )
                    result = 'Hace ' + hours + ' horas';
                else if ( days < 7 )
                    result = 'Hace ' + days + ' dias';
                else if ( weeks < 4 )
                    result = 'Hace ' + weeks + ' semanas' 
                else if ( months < 12 )
                result = 'Hace' + months + ' meses'
                else result = 'Hace' + years + ' años';

                return  result
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    ._content_title{
            font-size: 30px;
            font-weight: bold;
            line-height: 30px;
            margin: 0;
            //display: inline;
            margin-bottom: 1rem;
            //margin-left: .5rem;
        }

    ._content_container{
        position:relative;
        background-color: #fff;
        //padding: 18px;
        margin: auto;
        min-height: 40vh;
        height: auto;
        border: 1px solid #e1e1e1;
        //border: 1px solid rgba(34,36,38,.22);
        //box-shadow: inset 0 0 0 1px rgba(34,36,38,.22), 0 0 0 0 transparent;
        border-radius: .28571429rem;
        margin-bottom:1.4em;
        padding: 18px 18px 60px 18px;
        //padding: 18px;
        /*._content_title{
            font-size: 30px;
            font-weight: bold;
            line-height: 30px;
            margin: 0;
            //display: inline;
            margin-bottom: 2rem;
        }*/
        ._box_content{
            object-fit: cover;
            -o-object-position: center center;
            object-position: center center;
            padding: 10px 0 22px 0;
            margin-top:1rem;
            img{
                width: 100% !important;
                height: 100% !important;
            }
        }
        /*._content_etiquetas{
            font-size:12px;
            margin-bottom: .5rem;
            ._box_etiquetas{
                display: flex;
                list-style: none;
                flex-wrap: wrap;
                padding: 0;
                margin-top:.4rem;
                ._etiqueta{
                    padding: 5px 10px;
                    margin: 0 5px 5px 0px;
                    border-radius: 3px;
                    font-size: 12px;
                    cursor: pointer;
                    color: #575757;
                    background-color: #fff;
                    border: 1px solid #e1e1e1;
                }
            }
        }*/
        ._box_font{
            border-top: 1px solid #f2f2f2;
            font-size:12px;
            margin-bottom: .5rem;
            p { 
                margin-top:.5rem;
                margin-bottom: 0px;
            }
            a { color: #714DD2; }
            ul{
                margin-bottom:0rem;
            }
            
        }
        ._content_footer{
            position:absolute;
            bottom:2px;
            height: 50px;
        }
        ._box_reaction{
                    background-color: #FFFFFF;
                    border-bottom-left-radius: 6px;
                    border-bottom-right-radius: 6px;
                    padding:.7rem 0rem .7rem .4rem;     
                    font-size:14px;           
                    border-top: 1px solid #f2f2f2;
                    
                    .reaction_button{
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
                        border: 1px solid #e1e1e1;
                        border-radius: 12px;
                        
                    }
                    #up{
                        color:#02A24B;
                        &:hover{
                            background-color:#02A24B;
                            color:#fff; 
                            border: 1px solid #02A24B;
                        }
                    }
                    #_s_down{
                        margin-left:.5rem;
                    }
                    #down{
                        color:#db4242;
                        &:hover{
                            background-color:#db4242;
                            color:#fff; 
                            border: 1px solid #db4242;
                        }
                    }
                    #reply{
                        margin-left: 1rem;
                    }
                    .reply{
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
                      &:hover{
                          //color:rgba(0,0,0,.8);
                          background-color:#EAE4F8;
                          //border: 1px solid #e1e1e1;
                          border-radius: 12px;
                            i{
                                color:rgba(0,0,0,.9);
                            }
                      }
                    }                                       
        }
        .user_post{
            display: flex;
            justify-content: space-between;   
            .user_content{
                display:flex;
                align-items: center;
                .user_content_avatar{
                    object-fit: cover;
                    -o-object-position: center center;
                    object-position: center center;
                    width: 30px;
                    height: 30px;
                    margin-right: .8rem;
                    img{
                        width:100%;
                        height: 100%;
                        border-radius: .25rem;
                        display:block;
                    }
                }
                a{
                    font-size: 1em;
                    color: rgba(0,0,0,.87);
                    font-weight: 700;
                    cursor:pointer;
                    margin-right:1rem;
                }
                a:hover{
                    color:#4183c4;
                }
            }
        }
        ._content_fec{
            font-size: 13px;
        }
    }

    .header_options_container{
        .header_options{
            align-items: center;
            color: inherit;
            display: inline-flex;
            font-size: 18px;
            height: 26px;
            justify-content: center;
            line-height: 12px;
            padding: 0 8px;
        }
    }
</style>