<template>
    <div class="container">
        <div class="box2">
            <div class="title"> 
                <b-input placeholder="Título (obligatorio)" v-model="prueba.title" v-on:input="verifyData" ></b-input>
            </div>              
            <Editor class="editor__container" 
            @title="prueba.title = $event"
            @fonts="fuentes = $event"
            @ready="childVal => { value = childVal }" 
            :mode="mode" 
            />
        </div>
        <div class="box3">
            <div class="_box3_title">
                <h2>Fuentes</h2>
            <div class="_add_font">
                <b-input placeholder="http://" v-model="fuente" size="is-small" class="_font_input" v-on:input="activeFont"></b-input>
                <b-button type="is-primary" size="is-small" class="_font_button" @click="addFont" :disabled="statusFont"><i class='bx bx-plus-circle'></i></b-button>
            </div>
            

            <div class="_box3_field">
                <b-tag    
                    v-for="(fuente, i) in fuentes" :key="i"
                    closable
                    aria-close-label="Close tag"
                    @close="deleteFont(i)">
                    {{fuente}}
                </b-tag>
            </div>

            </div>
        </div>
        <b-button v-if="mode== 'normal'" id="box__button" @click="saveData" type="is-primary" expanded :loading="publicar" :disabled="statusNew">Publicar</b-button>
        <b-button v-else id="box__button" @click="uploadData" type="is-primary" expanded :loading="publicar" :disabled="statusNew">Guardar cambios</b-button>
    </div>
</template>

<script>
import Editor from '../Editor';
import axios from 'axios';

export default  {
    props:[ 'mode' ],
    components:{
        Editor
    },
    data(){
        return{
            fuentes:[],
            fuente:'',
            statusFont:true,
            statusNew:true,
            isTag1Active: true,
            isTag2Active: true,
            isTag3Active: true,
            isTag4Active: true,
            isTag5Active: true,
            isTag6Active: true,
            value:0,
            prueba:{
                title:'',
                content: '<p>Push desde vue</p>'      
            },
            URL:'https://proyecto-foro-prototipo.herokuapp.com/hilo/',
            URL2:'http://localhost:3000/hilo',
            publicar:false
        }
    },
    methods:{
        async saveData(){
            this.publicar=true;
            if(this.prueba.title== '' ) this.prueba.title = 'Sin titulo';
            try {
                await axios.post(`${this.URL}`,{
                    title:this.prueba.title,
                    content:this.value,
                    fonts: this.fuentes
                })
                    this.$router.push({ path: `/hilos/`})
                    this.publicar=false;
                } catch (error) {
                console.error(error);
            }
        },
        async uploadData(){
            this.publicar=true;
            try {
                await axios.put(`${this.URL}${this.$route.params.id}`,{
                    title:this.prueba.title,
                    content:this.value,
                    fonts: this.fuentes
                })
                    this.$router.push({ path: `/hilos/${this.$route.params.id}`})
                    this.publicar=false;
                } catch (error) {
                console.error(error);
            }
        },
        verifyData(){
            if( this.prueba.title != '' && this.value != '' )
                this.statusNew = false;
            else this.statusNew = true;
        },
        activeFont(){
            let existe = false;

            //Verifico si la fuente está agregada
            if( this.fuentes.length > 0 ){
                for( let i=0; i < this.fuentes.length; i++ ) {
                    if ( this.fuentes[i] == this.fuente )
                        existe = true;
                }
            }

            //Solo dejar agregar fuente si empieza con http:// o https:// y terminan con . algo
            if( (this.fuente.substr(0,7) == 'http://' || this.fuente.substr(0,8) == 'https://' )
            && this.fuente.indexOf(".") != -1 && !existe)
            { 
                let words = this.fuente.split('.')
                //Si la ultima palabra despues del '.' es mayor a 1, dejo agregar fuente
                if( words[words.length-1].length > 1 )
                    this.statusFont = false;
                else this.statusFont = true;
            }
            else this.statusFont = true;
        },
        addFont(){
            this.fuentes.push(this.fuente);
            this.fuente='';
            this.statusFont = true;
        },
        deleteFont(i){
            this.fuentes.splice(i, 1);
        }
    }
}
</script>

<style lang="scss" scoped>

    .container{
        margin:auto;
        //display:flex;
        max-width:50%;
        //background-color: red;
        .box2{
            width:100%;
            margin-top:1em;

            .title{
                width:100%;
            }
            .editor__container{
                margin:auto;
            }
            #box__button{
                margin-top:1em;
            }
        }

        .box3{
            //width:30%;
            width: 100%;
            margin-top:1em;
            ._box3_title{
                width:100%;
                ._add_font{
                    //display:flex;
                    margin: 10px 0;
                    ._font_button{
                        //width:auto;
                        //float:right;
                    }
                    ._font_input{
                        width:70%;
                        margin-right:.5em;
                        float:left;
                        //margin: 10px 0;
                    }
                    //display:flex
                    .tags .has-addons{
                        margin-bottom:0px;
                    }
                }
                ._box3_field{
                    width:100%;
                    overflow: hidden;
                    display: table-caption;
                    margin-bottom:1rem;
                    //padding-top: .3rem;
                }
            }

        }

    }
    
</style>