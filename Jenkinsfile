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
            mail bcc: '', body: '', cc: 'tamiyabuild@gmail.com', from: '', replyTo: '', subject: 'Build React Native', to: 'tamiyabuild@gmail.com'
        }
    }
}