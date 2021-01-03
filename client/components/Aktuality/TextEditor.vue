<template>
  <form @submit.prevent="store">
    <ckeditor :editor="editor" v-model="content" :config="editorConfig" />
  </form>
</template>

<script>
// import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@blowstack/ckeditor5-full-free-build";
import UploadAdapter from "@/components/Aktuality/UploadAdapter";
import "@blowstack/ckeditor5-full-free-build/build/translations/cs";

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        title: false,
        toolbar: [
          "heading",
          "|",
          "fontSize",
          "fontFamily",
          "bold",
          "italic",
          "strikethrough",
          "|",
          "link",
          "bulletedList",
          "numberedList",
          "alignment",
          "|",
          "insertTable",
          "|",
          "imageUpload",
          "mediaEmbed",
          "|",
          "highlight",
          "|",
          "undo",
          "redo",
          "|",
          "horizontalLine",
        ],
        table: {
          toolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        mediaEmbed: {
          previewsInData: true,
        },
        removePlugins: ["Title"],
        extraPlugins: [this.uploader],
        language: "cs",
      },
    };
  },

  methods: {
    store() {
      // Some code
    },

    uploader(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
      };
    },
  },

  computed: {
    content: {
      set(value) {
        this.$store.dispatch("setPostContent", value);
        this.$emit('contentChanged') ;
      },
      get() {
        return this.$store.getters.getPostContent;
      },
    },
  },

  components: {
    ckeditor: CKEditor.component,
  },
};
</script>


