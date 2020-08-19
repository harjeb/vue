<template>
    <section class="serverinfo">

        <Input v-model="server.ip" placeholder="Enter test server ip" style="width: 150px" />
        <Input v-model="server.user" placeholder="Enter username" style="width: 130px" />
        <Input v-model="server.password" type="password" password placeholder="Enter password" style="width: 130px" />
        &nbsp;
        <button @click="deleteP">删除</button>

    </section>
</template>
<script>
export default {
    props: {
        server: {
            type: Object,
            default() {
                return {};
            }
        },
        index: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
        };
    },
    methods: {
        deleteP() {
            this.$emit('deleteIndex', this.index);
        }
    }
};
</script>
<style scoped lang="less">
    /deep/ .ivu-input{
        line-height: 3em;
    }
</style>