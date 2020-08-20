<template>
    <section class="serverinfo">

        <Input v-model="server.ip" placeholder="Enter test server ip" style="width: 150px" clearable />
        <Input v-model="server.user" placeholder="username" style="width: 100px" clearable />
        <Input v-model="server.password" type="password" password placeholder="password" style="width: 100px" />
        &nbsp;
        <Select v-model="testmodule" multiple style="width:150px">
        <Option v-for="item in moduleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        &nbsp;
        <Button @click="check" ref="checkBtn">检查网络</Button>
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
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                testmodule: []
        };
    },
    methods: {
        deleteP() {
            this.$emit('deleteIndex', this.index);
        },
        check() {
            console.log(config.flag)
            this.$axios.get('http://127.0.0.1:5000/api/hi').then((response)=>{
                    this.newsList=response.data.data;
                    console.log(this.newsList);
                }).catch((response)=>{
                    console.log(response);
                })
            console.log('11')

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
                console.log(this.testmodule)
                this.$refs.checkBtn.$el.innerText= "checking";
                this.$refs.checkBtn.type= "success"
                let latency=util.ssh_test(this.server.ip,this.server.user,this.server.password)
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