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
            mail bcc: '', body: 'Status - $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', cc: 'tamiyabuild@gmail.com', from: '', replyTo: '', subject: 'Status - $PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', to: 'tamiyabuild@gmail.com'
        }
    }
}