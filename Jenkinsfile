pipeline{
    agent any
    stages {
        stage('Clone'){
            steps{
                git "https://github.com/hieuprokk97/tamiya.git"
            }
        }
    }
    post {
    success {
        script {
            mail to: 'tamiyabuild@gmail.com',
                 subject: 'Build thành công Client của app Tamiya',
                 body: 'Build thành công'
        }
    }
    failure {
        script {
            mail to: 'tamiyabuild@gmail.com',
                 subject: 'Build lỗi Client của app Tamiya',
                 body: 'Build lỗi'
        }
    }
}
}