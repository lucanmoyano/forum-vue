<template>
    <div id="app">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" v-on:input="verifyData()" ></ckeditor>
    </div>
</template>


<script>
    import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

    /*******************Plugins***************/
    import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
    import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
    import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
    import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
    import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
    import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
    import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
    import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
    import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
    import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
    import Link from '@ckeditor/ckeditor5-link/src/link';
    import Image from '@ckeditor/ckeditor5-image/src/image';
    import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
    import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
    import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
    import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
    import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
    import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
    import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
    import Table from '@ckeditor/ckeditor5-table/src/table';
    import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
    import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
    import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
    import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
    import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
    import Heading from '@ckeditor/ckeditor5-heading/src/heading';
    import Font from '@ckeditor/ckeditor5-font/src/font';
    import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
    import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
    import List from '@ckeditor/ckeditor5-list/src/list';
    //import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
    //import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

    import UploadAdapter from './UploadAdapter';
    import axios from 'axios';

    export default {
        props:['mode'],
        data() {
            return {
                URL:'https://proyecto-foro-prototipo.herokuapp.com/hilo/',
                editor: ClassicEditor,
                editorData: '',
                editorConfig: {
                    extraPlugins: [this.uploader],
                    plugins: [
                        EssentialsPlugin,
                        Bold, Italic, Underline, Strikethrough, Code, Subscript, Superscript,
                        LinkPlugin,
                        ParagraphPlugin,
                        Link,
                        Image,
                        ImageCaption,
                        ImageStyle,
                        ImageToolbar,
                        ImageUpload,
                        MediaEmbed,
                        ImageResize,
                        TodoList,
                        Table, TableToolbar, TableProperties, TableCellProperties,
                        Alignment,
                        HorizontalLine,
                        Heading,
                        Font,
                        CodeBlock,
                        List,
                        BlockQuote,
                        //SimpleUploadAdapter
                        //EasyImage
                    ],

                    toolbar: {
                        items: [
                            'heading',
                            'bold',
                            'italic',     
                            'underline', 'strikethrough', 
                            '|',
                            'undo',
                            'redo',
                            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
                            '|',
                            //'link',
                            'link',
                            'imageUpload',
                            'mediaEmbed',
                            '|',
                            //'MathType',
                            //'ChemType',
                            'insertTable',
                            //'tableColumn', 'tableRow', 'mergeTableCells',
                            'alignment',
                            'horizontalLine',
                            'codeBlock',
                            'bulletedList',
                            'numberedList',
                            'blockQuote',
                            'code',
                            'subscript', 'superscript',
                            'todoList',
                        ]
                    },
                    image: {
                        toolbar: [
                            'imageStyle:full',
                            'imageStyle:side',
                            '|',
                            'imageTextAlternative',
                            'imageResize:50',
                            'imageResize:75',
                            'imageResize:original'
                        ],
                        resizeOptions: [
                            {
                                name: 'imageResize:original',
                                value: null,
                                icon: 'original'
                            },
                            {
                                name: 'imageResize:50',
                                value: '50',
                                icon: 'medium'
                            },
                            {
                                name: 'imageResize:75',
                                value: '75',
                                icon: 'large'
                            }
                        ],
                    },
                    table: {
                        contentToolbar: [
                            'tableColumn', 'tableRow', 'mergeTableCells',
                            'tableProperties', 'tableCellProperties'
                        ],

                        // Configuration of the TableProperties plugin.
                        //tableProperties: {
                            // ...
                        //},

                        // Configuration of the TableCellProperties plugin.
                        //tableCellProperties: {
                            // ...
                        //}
                    },
                    highlight: {
                        options: [
                            {
                                model: 'greenMarker',
                                class: 'marker-green',
                                title: 'Green marker',
                                color: 'rgb(25, 156, 25)',
                                type: 'marker'
                            },
                            {
                                model: 'yellowMarker',
                                class: 'marker-yellow',
                                title: 'Yellow marker',
                                color: '#cac407',
                                type: 'marker'
                            },
                            {
                                model: 'redPen',
                                class: 'pen-red',
                                title: 'Red pen',
                                color: 'hsl(343, 82%, 58%)',
                                type: 'pen',
                            }
                                ]
                },
                fontFamily:{
                    options:[
                        'default',
                        'Arial, Helvetica, sans-serif',
                        'Courier New, Courier, monospace',
                        'Georgia, serif',
                        'Lucida Sans Unicode, Lucida Grande, sans-serif',
                        'Tahoma, Geneva, sans-serif',
                        'Times New Roman, Times, serif',
                        'Trebuchet MS, Helvetica, sans-serif',
                        'Verdana, Geneva, sans-serif'
                    ]
                },
                fontColor: {
                    colors: [
                        {
                            color: 'hsl(0, 0%, 0%)',
                            label: 'Black'
                        },
                        {
                            color: 'hsl(0, 0%, 30%)',
                            label: 'Dim grey'
                        },
                        {
                            color: 'hsl(0, 0%, 60%)',
                            label: 'Grey'
                        },
                        {
                            color: 'hsl(0, 0%, 90%)',
                            label: 'Light grey'
                        },
                        {
                            color: 'hsl(0, 0%, 100%)',
                            label: 'White',
                            hasBorder: true
                        },
                        {
                            color: 'hsl(0, 100%, 50%)',
                            label: 'Rojo'
                        },
                        {
                            color: 'hsl(233, 100%, 50%)',
                            label: 'Azul'
                        },
                        {
                            color: 'hsl(118, 49%, 50%)',
                            label: 'Verde'
                        },
                        {
                            color: 'hsl(284, 49%, 50%)',
                            label: 'Violeta'
                        },
                        // ...
                    ]
        },
        fontBackgroundColor: {
            colors: [
                {
                    color: 'hsl(0, 75%, 60%)',
                    label: 'Red'
                },
                {
                    color: 'hsl(30, 75%, 60%)',
                    label: 'Orange'
                },
                {
                    color: 'hsl(60, 75%, 60%)',
                    label: 'Yellow'
                },
                {
                    color: 'hsl(90, 75%, 60%)',
                    label: 'Light green'
                },
                {
                    color: 'hsl(120, 75%, 60%)',
                    label: 'Green'
                },

                // ...
            ]
        },
        codeBlock:{
            languages: [
                { language: 'plaintext', label: 'Plain text' }, // The default language.
                { language: 'c', label: 'C' },
                { language: 'cs', label: 'C#' },
                { language: 'cpp', label: 'C++' },
                { language: 'css', label: 'CSS' },
                { language: 'diff', label: 'Diff' },
                { language: 'html', label: 'HTML' },
                { language: 'java', label: 'Java' },
                { language: 'javascript', label: 'JavaScript' },
                { language: 'php', label: 'PHP' },
                { language: 'python', label: 'Python' },
                { language: 'ruby', label: 'Ruby' },
                { language: 'typescript', label: 'TypeScript' },
                { language: 'xml', label: 'XML' }
            ]
        },
        /*simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: 'https://api.imgur.com/3/image/',

            // Enable the XMLHttpRequest.withCredentials property.
            

            // Headers sent along with the XMLHttpRequest to the upload server.
            headers: {
                Authorization: 'Client-ID c442922c12571db '
            }
        },*/
        cloudServices: {
            //tokenUrl: 'https://74385.cke-cs.com/token/dev/79ec57bc50b71edd38aa2049e64af2d23ebe2610ced5ba455f074c8f716e',
            //uploadUrl: 'https://74385.cke-cs.com/easyimage/upload/'
        }
                    /*mediaEmbed: {
                        providers: [
                            {
                                // A URL regexp or an array of URL regexps:
                                url: /^example\.com\/media\/(\w+)/,

                                // To be defined only if the media are previewable:
                                html: match => '...'
                            },
                            
                        ],
                    }*/
                }
            };
        },
        methods:{
                exportarHTML(){
                console.log(this.editorData);
            },
            verifyData(){
                this.$emit('ready', this.editorData)
                this.$parent.verifyData();
            },
            uploader(editor)
            {
                editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                    return new UploadAdapter( loader );
                };
            },
            async getContent(){
                
                try {
                    const response = await axios.get(`${this.URL}${this.$route.params.id}`);
                    //console.log(response.data)
                    this.editorData = response.data.content;
                    this.$emit('title', response.data.title);
                    this.$emit('fonts', response.data.fonts);
                    
                    
                } catch (error) {
                    console.error(error);
                }
            }
        },
          async mounted () {
            this.$emit('ready', this.editorData);
            if(this.mode == 'edit')
                await this.getContent();
        }
    }
</script>