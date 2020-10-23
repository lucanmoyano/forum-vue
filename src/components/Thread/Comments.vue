<template>
    <div class="comment_container">
        <div v-if="comments.length == 0" class="comment_count">No hay comentarios</div>
        <div v-else class="comment_count">{{comments.length}} comentarios</div>
        <div class="comment_box" v-for="(comment, i) in comments" :key="i">
          <a class="comment_box_avatar">
            <img :src="comment.avatar" class="avatar">
          </a>
          <div class="comment_area">
              <div class="comment_info">
                  <div class="comment_title">
                      <a>{{comment.user}}</a>
                      <b-tooltip :label="Cambiarfecha(comment.date)" type="is-dark" :animated="false">
                        <p>{{dateComment(comment.date)}}</p>
                      </b-tooltip>
                      <span class="tag_comment">Autor</span>
                  </div>    
              </div>
              <div class="text" v-html="comment.text"></div>
              <div class="comment_reactions">
                <b-tooltip label="Votar positivo" type="is-dark" :animated="false">
                    <a class="reaction_button" id="up"><i class='bx bxs-upvote'></i> 104</a>
                </b-tooltip>
                <span id="_s_down">
                    <b-tooltip label="Votar negativo" type="is-dark" :animated="false">
                        <a class="reaction_button" id="down"><i class='bx bxs-downvote' ></i></a>
                    </b-tooltip>
                </span>
                <span id="reply">
                    <b-tooltip label="Responder" type="is-dark" :animated="false">
                        <a class="reply" @click="replyComment(comment._id)"><i class='bx bxs-share'></i></a>
                    </b-tooltip>
                </span>
                  <!-- <a><i class='bx bx-dots-horizontal-rounded'></i></a> -->
              </div>
                <span v-if="comment.comments.length > 0">
                    <!-- <a class="view_reply" v-if="showComment && showId == comment._id" @click="viewComment(comment._id)"> -->
                    <a class="view_reply" v-if="showComments[i].id == comment._id  && showComments[i].show==true" @click="viewComment(comment._id, false)">
                        Ocultar respuestas
                    </a>
                    <a class="view_reply" v-else @click="viewComment(comment._id, true)">Ver {{comment.comments.length}} respuestas</a>
                </span>
          </div>

          <!-- <div v-if="showComment && showId == comment._id"> -->
          <div v-if="showComments[i].id == comment._id  && showComments[i].show==true">
          <div class="reply_comment" v-for="(reply, i) in comment.comments" :key="i">
            <i id="reply_icon" class='bx bx-reply bx-rotate-180' ></i>
            <a class="comment_box_avatar">
                    <img :src="reply.avatar" class="avatar2">
            </a>
            <div class="comment_area" :id="reply._id">
                <div class="comment_info">
                    <div class="comment_title">
                        <a>{{reply.user}}</a>
                        <b-tooltip :label="Cambiarfecha(reply.date)" type="is-dark" :animated="false">
                            <p>{{dateComment(reply.date)}}</p>
                        </b-tooltip>
                    </div>    
                </div>
                <div class="text" v-html="reply.text"></div>
                <div class="comment_reactions">
                <b-tooltip label="Votar positivo" type="is-dark" :animated="false">
                    <a class="reaction_button" id="up"><i class='bx bxs-upvote'></i> 104</a>
                </b-tooltip>
                <span id="_s_down">
                    <b-tooltip label="Votar negativo" type="is-dark" :animated="false">
                        <a class="reaction_button" id="down"><i class='bx bxs-downvote' ></i></a>
                    </b-tooltip>
                </span>
                <span id="reply">
                    <b-tooltip label="Responder" type="is-dark" :animated="false">
                        <a class="reply" @click="replyComment(comment._id, reply.user)"><i class='bx bxs-share'></i></a>
                    </b-tooltip>
                </span>
              </div>
            </div>

        </div> 
        </div>

        <AddComment 
            v-if="comment._id==reply.id  && reply.visible==true" 
            mode="reply"
            :idmode="comment._id"
            class="add_reply_comment"
            altura="110px"
            :idComment="comment._id"
            :key="updateUser+comment._id"
            :quote="quote"
            :user="replyUser"
            @text="text = $event"
            addCom="Agregar una respuesta"
        />
        
        </div>
<br>

    <AddComment 
    :idmode="'normal'"
    altura="160px"
    @text="text = $event"
    :key="updateC"
    addCom="Agregar un comentario"
    />

    </div>
    
</template>

<script>
import AddComment from './AddComment.vue';
import axios from 'axios';

export default {
    components:{
        AddComment
    },
    data(){
        return {
            URL:'https://proyecto-foro-prototipo.herokuapp.com/hilo/comments',
            URL2:'https://proyecto-foro-prototipo.herokuapp.com/comment/',
            URL3:'https://proyecto-foro-prototipo.herokuapp.com/comment/reply/', 
            
            updateUser:9999,
            updateC:8888,
            comments:[],
            reply:{
                    id:'',
                    visible:false
            },
            text:'',
            quote:'',
            replyUser:'',
            showComment:false,
            showId:'',
            showComments:[]
        }
    },
    methods:{
        async getComments(){
            try {
                const response = await axios.get(`${this.URL}/${this.$route.params.id}`);
                this.comments = response.data.comments;
                for(let i=0; i < this.comments.length; i++){
                    this.showComments.push({id:this.comments[i]._id, show:false})
                }
            } catch (error) {
                console.error(error);
            }
        },
        async addComment(){
            try {
                await axios.post(`${this.URL2}${this.$route.params.id}`,{
                text:this.text
            })
                this.getComments();
                this.text='';
                this.replyUser=''
                this.updateC++;
                this.updateIn();
            } catch (error) {
                console.error(error);
            }
        },
        async addReplyComment(idComment){
            try {
                await axios.post(`${this.URL3}${idComment}`,{
                text:this.text,
            })
                this.getComments();
                this.text='';
                this.replyUser=''
                this.updateUser++;
            } catch (error) {
            console.error(error);
            }
            this.reply.visible = false;
            this.viewComment(idComment, true)
            //this.showComment = true;
            //this.showId = idComment;
        },
        replyComment(commentId, user){
            this.reply.id = commentId;
            this.reply.visible = true;

            //Arrobar
            if( typeof user !== 'undefined' )
                 this.replyUser = `  
                 <span data-mention-id="1">${user}</span> 
                 `;
            else this.replyUser = ''

            this.updateUser++;
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
        },
        Cambiarfecha(inputDate) { 
          
            var date = new Date(inputDate);
            var months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            if (!isNaN(date.getTime())) {
                // Months use 0 index.
                return  date.getDate() + ' ' + (months[date.getMonth()]) +' '+ date.getFullYear() +
                '    '+date.toLocaleTimeString();
            }
          
       },
       viewComment(idComment, value){
            //this.showComment = !this.showComment;
           //this.showId = idComment;
           for(let i=0; i < this.showComments.length; i++){
                if( idComment == this.showComments[i].id )
                    this.showComments[i].show = value;
           }
       },
       closeComment(){
           this.reply.visible = false;
       },
       updateIn(){
           this.$parent.getContent();
       }
    },
    async mounted(){
        await this.getComments();
    }
}
</script>

<style lang="scss" scoped>
    .comment_container{
        background-color: #fff;
        margin: auto;
        height: auto;
        font-size: 14px;
        //background-color: red;
        margin-top:2rem;
        border: 1px solid #e1e1e1;
        border-radius: .28571429rem;
        padding: 13px;
        .comment_count{
            font-weight: 300;
            flex: 1;
            font-size: 18px;
            border-bottom: 1px solid #ebeef1;
            padding-bottom: 8px;
        }
        .comment_box{
            border-bottom: 1px solid #ebeef1;
            margin-top: .6rem;
            //padding: 13px;
        }
            .comment_box_avatar{
                padding-top: 1em;
                .avatar{
                    border-radius: 10%!important;
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    object-position: center center;
                    float: left;
                }
            }
            .comment_area{
                margin-left: 3em;
                position: relative;
                color: #24292e;
                background-color: #fff;
                border-radius: 6px;
                .comment_info{
                    //padding: .6em;
                    padding-top: 0em;
                    display: flex;
                    justify-content: space-between;
                    padding-left: .6em;
                    .comment_title{
                        display: inline-flex;
                        a{
                            font-size: 1em;
                            color: rgba(0,0,0,.87);
                            font-weight: 700;
                            cursor:pointer;
                            padding-right: 1rem;
                            &:hover{
                              color: rgba(77, 116, 224, 0.87);
                          }
                        }
                        p{
                            color: rgba(0,0,0,.6);
                            font-size: .875em;
                            margin-top: .12em;   
                            //margin-bottom: .8em;                     
                            &:hover{
                                color: rgba(0,0,0,.8);
                            }
                        }
                        .tag_comment{
                            background-color: #f2effb;
                            color: #552fbc;
                            margin-left: .5rem;
                            font-size: 9px;
                            line-height: 15px;
                            padding: 0 10px;
                            align-self: center;
                            text-transform: uppercase;
                            border-radius:20px;
                        }
                    }
                    
                }
                .text{
                    padding: 0px 9px 20px 9px;
                    overflow: visible;
                    font-size: 14px;
                    //line-height: .6em;
                 
                        img{
                        max-width: 300px;
                        height:auto;
                        }
                    
                }
                
                .comment_reactions{
                    background-color: #FFFFFF;
                    border-bottom-left-radius: 6px;
                    border-bottom-right-radius: 6px;
                    padding:.7rem 0rem .7rem .4rem;     
                    font-size:14px;           
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
                        //border: 1px solid;
                        border-radius: 12px;
                        //margin-left: 1rem;
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

        }
    }

    
    /*Reply comment*/
            .reply_comment{
                border-top: 1px solid #ebeef1;
                padding-left:2em;
                padding-top: 1em;
                #reply_icon{
                    float: left;
                    font-size: 25px;
                    color: rgba(0,0,0,.2);
                    margin-top: .2rem;
                }
            .comment_box_avatar{
                //padding-top: 0em;
                .avatar2{
                    border-radius: 10%!important;
                    width: 30px;
                    height: 30px;
                    object-fit: cover;
                    object-position: center center;
                    float: left;
                }
            }

            .comment_area{
                margin-left: 4em;
            }

            }

            .add_reply_comment{
                margin-top: 1rem;
            }

            .nodef{
                color:#24292e;
            }

            .view_reply{
                color:rgba(0, 0, 0, 0.6);
                font-size:13px;
                padding: 0rem 0rem 0rem .4rem;
                //padding: 6px 10px;
                //border: 0;
                //outline: 0;
                //color: #2594ef;
                //background-color: #f2f2f2;
                //border-radius: 4px;
                //font-size: 13px;
                //margin-top: 8px;
                &:hover{
                    color:rgba(0,0,0,.8);
                    //text-decoration: underline rgba(0,0,0,.8);
                }
            }
</style>