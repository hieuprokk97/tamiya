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
        always {
            mail bcc: '', cc: 'tamiyabuild@gmail.com', from: '', replyTo: '', to: 'tamiyabuild@gmail.com'
        }
    }
}