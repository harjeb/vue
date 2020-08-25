<template>
    <section class="serverinfo">

        <Input v-model="server.ip" placeholder="Enter test server ip" style="width: 150px" clearable />
        <Input v-model="server.user" placeholder="username" style="width: 100px" clearable />
        <Input v-model="server.password" type="password" password placeholder="password" style="width: 100px" />
        &nbsp;
        <Select v-model="testmodule" multiple style="width:180px">
        <Option v-for="item in moduleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        &nbsp;
        <Button @click="btnConvert" :loading="isBtnLoading" ref="checkBtn">检查网络</Button>
        &nbsp;
        <Button @click="deleteP" type="error" style="width:60px" >删除</Button>
        <br>
        <br>
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
                moduleList: [
                    {
                        value: 'all',
                        label: '全部执行'
                    },
                    {
                        value: 'London',
                        label: '预装检查'
                    },
                    {
                        value: 'Sydney',
                        label: '系统管理'
                    },
                    {
                        value: 'Ottawa',
                        label: '文件系统'
                    },
                    {
                        value: 'Paris',
                        label: '命令测试'
                    },
                    {
                        value: 'Canberra',
                        label: '维护性测试'
                    },
                    {
                        value: 'a',
                        label: '开发语言与运行库'
                    },
                    {
                        value: 'b',
                        label: '服务器应用测试'
                    },
                    {
                        value: 'C',
                        label: '内核功能测试'
                    }
                ],
                testmodule: [],
                isBtnLoading: false,
        };
    },
    methods: {
        deleteP() {
            this.$emit('deleteIndex', this.index);
        },
        //get latency
        getLatency(){
            return this.$axios.get('/api/ms',{
                params:{
                    ip:this.server.ip,
                    user:this.server.user,
                    password:this.server.password
                }
            })
        },
        async btnConvert(){
            try {
                if (this.server.ip.match(/^\s*$/) || this.server.user.match(/^\s*$/) || this.server.password.match(/^\s*$/)){
                    alert("没有填写信息");
                }
                else{

                this.isBtnLoading=true
                let ll = await this.getLatency();

                this.isBtnLoading = false
                console.log(ll.data);
                this.$refs.checkBtn.$el.innerText= "延迟:"+ll.data;
                }
                this.$refs.checkBtn.type= "success"

            } catch(err) {
                console.log(err)
                this.isBtnLoading = false
                this.$refs.checkBtn.$el.innerText='failed';
                this.$refs.checkBtn.type= "error"

            }
        }

    }
};
</script>
<style scoped lang="less">
    .ivu-btn{
        width: 120px;
    }
</style>