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
                 subject: 'Build thành công tamiya_client',
                 body: 'Build thành công'
        }
    }
    failure {
        script {
            mail to: 'tamiyabuild@gmail.com',
                 subject: 'Build lỗi tamiya_client',
                 body: 'Build lỗi'
        }
    }
}
}