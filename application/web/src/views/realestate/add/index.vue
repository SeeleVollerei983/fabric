<template>
  <div class="app-container">
    <el-form ref="ruleForm" v-loading="loading" :model="ruleForm" :rules="rules" label-width="100px">

      <el-form-item label="医生" prop="proprietor">
        <el-select v-model="ruleForm.proprietor" placeholder="请选择医生" @change="selectGet">
          <el-option
            v-for="item in accountList"
            :key="item.accountId"
            :label="item.userName"
            :value="item.accountId"
          >
            <span style="float: left">{{ item.userName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.accountId }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="患者信息" prop="totalArea">
         <el-input v-model="ruleForm.totalArea" placeholder="姓名/性别/联系方式/症状/陪护..." size="small" />
      </el-form-item>
      <el-form-item label="就诊记录" prop="livingSpace">
         <el-input v-model="ruleForm.livingSpace" placeholder="就诊日期/地点/科室/病情描述/诊断结果/处方/手术记录/..." size="small" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryAccountList } from '@/api/account'
import { createRealEstate } from '@/api/realEstate'

export default {
  name: 'AddRealeState',
  data() {
    var checkArea = (rule, value, callback) => {
        callback()
    }
    return {
      ruleForm: {
        proprietor: '',
        totalArea: '',
        livingSpace: '',
      },
      accountList: [],
      rules: {
        proprietor: [
          { required: true, message: '请选择医生', trigger: 'change' }
        ],
        totalArea: [
          { validator: checkArea, trigger: 'blur' }
        ],
        livingSpace: [
          { validator: checkArea, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'accountId'
    ])
  },
  created() {
    queryAccountList().then(response => {
      if (response !== null) {
        // 过滤掉病人
        this.accountList = response.filter(item =>
          item.userName !== '病人'
        )
      }
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否立即创建?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.loading = true
            createRealEstate({
              accountId: this.accountId,
              proprietor: this.ruleForm.proprietor,
              totalArea: this.ruleForm.totalArea,
              livingSpace: this.ruleForm.livingSpace
            }).then(response => {
              this.loading = false
              if (response !== null) {
                this.$message({
                  type: 'success',
                  message: '创建成功!'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '创建失败!'
                })
              }
            }).catch(_ => {
              this.loading = false
            })
          }).catch(() => {
            this.loading = false
            this.$message({
              type: 'info',
              message: '已取消创建'
            })
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    selectGet(accountId) {
      this.ruleForm.proprietor = accountId
    }
  }
}
</script>

<style scoped>
</style>
