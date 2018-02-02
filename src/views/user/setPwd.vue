<template>
<div>
    修改密码
    <div class="content-container">
      
        <!-- <el-form  :model="modifyPwd" ref="modifyPwd" label-width="120px">
            
            <el-form-item label="原密码："  prop='originPwd'>
                <el-input v-model="modifyPwd.originPwd" type='password' placeholder='请输入原密码' :maxlength='20'></el-input>
            </el-form-item>
            <el-form-item label="新密码："  prop='newPwd'>
                <el-input v-model="modifyPwd.newPwd" type='password' placeholder='请输入新密码' :maxlength='20'></el-input>
            </el-form-item>
            <el-form-item label="确认新密码："  prop='reNewPwd'>
                <el-input v-model="modifyPwd.reNewPwd" type='password' placeholder='请输入确认新密码' :maxlength='20'></el-input>
            </el-form-item>
            
            <el-form-item>
                <div class="operate">
                    <el-button @click="onSubmit" type="primary" >确认</el-button>
                    <el-button @click="reset('modifyPwd')">重输</el-button>
                </div>
            </el-form-item>
        </el-form> -->
    </div>
</div>

    
</template>

<style type="text/css" scoped>
  .content-container{width: 500px}
</style>

<script type="text/javascript">
    import md5 from 'js-md5'
    import { mapGetters } from 'vuex'
    import api from '@/api/index'

    export default {
        data() {
            return {
                modifyPwd:{
                    originPwd:'',
                    newPwd:'',
                    reNewPwd:''
                }
            }
        },

        mounted()  {

        },
        methods:{
            reset(formName){
	            // this.$refs[formName].resetFields()
	        },

            //确定
            onSubmit(){
            	if(!this.modifyPwd.originPwd){
            		this.$alert('请输入原密码')
            		return
            	}else if(!this.modifyPwd.newPwd){
            		this.$alert('请输入新密码')
            		return
            	}else if(!this.modifyPwd.reNewPwd){
            		this.$alert('请输入确认新密码')
            		return
            	}else if(this.modifyPwd.newPwd != this.modifyPwd.reNewPwd){
            		this.$alert('新密码与确认密码不一致')
            		return
            	}
                let loginParams = { 
                    'account': {
                        oldpwd : md5(this.modifyPwd.originPwd),
                        newpwd : md5(this.modifyPwd.newPwd)
                    }
                }
                api.modifyPwd(loginParams).then(res => {
                    // if (res.code != 0) {
                    //     this.$alert(res.msg,"提示")
                    //     return
                    // }
                    // this.$message("成功！")

                })


            }
        }
    }
</script>