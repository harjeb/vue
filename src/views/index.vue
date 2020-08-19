<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
        .serverinfo{
            line-height: 10px;
        }
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <serverinfo v-for="(item, index) in servers"
                    :key="index"
                    :index="index"
                    :server="item"
                    @deleteIndex="del"
                > </serverinfo>
                <br>
                <Button @click="add()">点击添加</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button @click="handleStart" type="primary">Start</Button>
                </br>
            </Col>
        </Row>
    </div>
</template>
<script>
    import Serverinfo from './serverinfo'
    export default {
        components:{
            Serverinfo
        },
        data(){
            return {
                servers:[{ip:'', user:'',password:''}]
            }
        },
        methods: {
            add() {
                this.servers.push({ip:'', user:'',password:''});
            },
            del(val) {
                if (val !== 0) {
                    this.servers.splice(val, 1);
                }
            },
            handleStart () {
                this.$Modal.info({
                    title: this.servers[0].ip,
                    content: this.servers[0].user
                });
            },
        }
    }
</script>
