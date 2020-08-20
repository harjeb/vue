<style scoped lang="less">
    .index{
        width: 700px;
        position: absolute;
        top: 220px;
        bottom: 0;
        left: 50px;
        height: 500px;
        text-align: center;

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
        <Scroll height=150>
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <serverinfo v-for="(item, index) in servers"
                    :key="index"
                    :index="index"
                    :server="item"
                    @deleteIndex="del"
                > </serverinfo>
            </Col>
        </Row>
        </Scroll>
            <br>
                <Button @click="add()">点击添加</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button @click="handleStart" type="primary">Start</Button>
            </br>
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
