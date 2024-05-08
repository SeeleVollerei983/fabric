import request from '@/utils/request'

// 查询转移病历列表(可查询所有，也可根据发起转移病历人查询)
export function queryDonatingList(data) {
  return request({
    url: '/queryDonatingList',
    method: 'post',
    data
  })
}


// 根据受赠人(受赠人AccountId)查询转移病历(受赠的)(供受赠人查询)
export function queryDonatingListByGrantee(data) {
  return request({
    url: '/queryDonatingListByGrantee',
    method: 'post',
    data
  })
}

// 更新转移病历状态（确认受赠、取消） Status取值为 完成"done"、取消"cancelled"
export function updateDonating(data) {
  return request({
    url: '/updateDonating',
    method: 'post',
    data
  })
}

// 发起转移病历
export function createDonating(data) {
  return request({
    url: '/createDonating',
    method: 'post',
    data
  })
}
