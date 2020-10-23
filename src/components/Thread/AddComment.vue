<template>
    <div>

    <div class="add_comment_box">
            <a class="add_comment_box_avatar">
                    <img :src="img2" class="avatar">
            </a>

            <div class="add_comment_area">

    <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">

                <b-tooltip  label="Negrita" type="is-dark" :animated="false">
                    <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                    >
                    <i class='bx bx-bold'></i>
                    </button>
                </b-tooltip>

                <b-tooltip  label="Italica" type="is-dark" :animated="false">
                    <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                    >
                    <i class='bx bx-italic' ></i>
                    </button>
                </b-tooltip>

                <b-tooltip  label="Tachado" type="is-dark" :animated="false">
                    <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                    >
                    <i class='bx bx-strikethrough' ></i>
                    </button>
                </b-tooltip>

                <b-tooltip  label="Subrayar" type="is-dark" :animated="false">
                    <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                    >
                    <i class='bx bx-underline' ></i>
                    </button>
                </b-tooltip>

                <b-tooltip  label="Citar" type="is-dark" :animated="false">
                    <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                    >
                    <i class='bx bxs-quote-right' ></i>
                    </button>
                </b-tooltip>

                <b-tooltip  label="Agregar imagen" type="is-dark" :animated="false">
                <button
                class="menubar__button"
                @click="selectImage"
                >
                    <i class='bx bxs-image-add' ></i>
                </button>
                </b-tooltip>

                <input hidden=true
                    ref="files"
                    @change="addImage"
                    type="file"
                    accept="image/*"
                    :id="idmode"
                >

            </div> 
        </editor-menu-bar>

        <editor-content class="editor__content" :editor="editor" />

    </div>

        <div class="footer_comment">
            <b-button size="is-small"
                v-if="mode=='reply'"
                type="is-primary is-light"
                @click="closeComment">
                Cancelar
            </b-button>
            <b-button size="is-small"
                type="is-primary"
                @click="addComment">
                Comentar
            </b-button>
        </div>
                    
            </div>

        </div>

  </div>
</template>

<script>

import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
    Image,
    Blockquote,
    Bold,
    Italic,
    Strike,
    Underline,
    Link,
    Placeholder,
    Mention
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props:['mode', 'cita', 'altura', 'quote','idComment', 'user', 'idmode', 'addCom'],
  data() {
    return {
      img2:'https://i.imgur.com/rhP4uXl.gif',
      text:'',
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new Image(),
          new Link(),
          new Mention(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: this.addCom,
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],
        content:this.user,
        linkUrl: null,
        linkMenuIsActive: false,
      }),
    }
  },
    methods: {
        selectImage(){     
            document.getElementById(this.idmode).click();
        },
        addImage(e) {
            const command = this.editor.commands.image;
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = function() {
            let formData = new FormData();
            formData.append('image', e.target.files[0]);
            fetch(`https://api.imgur.com/3/image/`, {
                method: 'post',
                headers: {
                    Authorization: 'Client-ID c442922c12571db '
            },
                body: formData,
            }).then( data => data.json()).then(data => {
                let src = data.data.link
                command({ src })
            })

            }
        },
        addComment(){
            this.$emit('text', this.editor.getHTML());
            if( this.mode == 'reply' ){
                this.$parent.addReplyComment(this.idComment);
            }
            else this.$parent.addComment();
        },
        closeComment(){
            this.$parent.closeComment();
        }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  created(){
      //if(typeof this.editor != 'undefined')
        //this.editor.focus()
  }
}
</script>

<style lang="scss" scoped>

.add_comment_box_avatar{
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
    .add_comment_area{
        margin-left: 3.8em;
        position: relative;
        color: #24292e;
        background-color: #fff;
        border-radius: 6px;
        .add_comment_edit{
            display: inline-flex;
            i{
                font-size: 1.4em;
                color: rgba(0,0,0,.87);
                font-weight: 200;
                cursor:pointer;
                padding-right: 1rem;
            }
            i:hover{
                color: rgba(77, 116, 224, 0.87);
            }
        }
        /*.editor_markdown{
            padding-left: .5em;
            font-size: 14px;                 
            position: relative;
            textarea{
                width: 100%;
                resize: none;
                min-height: 42px;
                line-height: 15px;
                padding: 13px 16px;
                overflow: hidden;
                border-bottom: 1px solid #d1d5da;
                
                &:focus{border: 1px solid #2594ef;}
            }
            
        }*/
        .footer_comment{
            padding: .3rem 0rem .2rem .3rem;
            justify-content: flex-end;
            display: flex;
           /* a{
                color: rgba(0,0,0,.87);
                font-size:20px;
                cursor:pointer;
                &:hover{
                    color: rgba(77, 116, 224, 0.87);
                }
            }*/
            //button{
                //float:right;
               // justify-content: flex-end;
                //display: flex;
            //}
        }
    }


   
</style>