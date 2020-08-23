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
        <Button @click="getRes" ref="checkBtn">检查网络</Button>
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
        //get latency
        getLatency(){
            return this.$axios.get('http://127.0.0.1:5000/api/ms',{
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
                else{let ll = await this.getLatency();
                console.log(ll.data);
                this.$refs.checkBtn.$el.innerText=ll.data;}
                this.$refs.checkBtn.type= "success"
            } catch(err) {
                console.log(err)
                this.$refs.checkBtn.$el.innerText='failed';
                this.$refs.checkBtn.type= "error"
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