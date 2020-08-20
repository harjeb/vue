<template>
    <section class="serverinfo">

        <Input v-model="server.ip" placeholder="Enter test server ip" style="width: 150px" clearable />
        <Input v-model="server.user" placeholder="Enter username" style="width: 130px" clearable />
        <Input v-model="server.password" type="password" password placeholder="Enter password" style="width: 130px" />
        &nbsp;
        <Button @click="check" ref="checkBtn">检查网络</Button>
        &nbsp;
        <Button @click="deleteP" type="error">删除</Button>

    </section>
</template>
<script>
import util from '../libs/util.js'
import config from '../libs/config.js'

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
        },
        check() {
            console.log(config.flag)
            if (this.server.ip.match(/^\s*$/) || this.server.user.match(/^\s*$/) || this.server.password.match(/^\s*$/)){
                alert("没有填写信息")
                this.$refs.checkBtn.$el.innerText="检查网络";
                this.$refs.checkBtn.type= "default"
                config.flag = false
            }

            else if (config.flag){
                this.$refs.checkBtn.$el.innerText="检查网络";
                this.$refs.checkBtn.type= "default"
                config.flag = !config.flag
            } else{
                // console.log(this.server.ip)
                // console.log(this.server.user)
                // console.log(this.server.password)
                this.$refs.checkBtn.$el.innerText= "checking";
                this.$refs.checkBtn.type= "success"
                let latency=util.ssh_test(this.server.ip,this.server.user,this.server.password)
                console.log(this.$refs.checkBtn.width)
                this.$refs.checkBtn.$el.innerText= latency;
                config.flag = !config.flag
                // TODO ssh连接后ping

            }
        }

    }
};
</script>
<style scoped lang="less">
    .ivu-btn{
        width: 100px;
    }
</style>