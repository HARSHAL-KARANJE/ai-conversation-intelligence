// Jenkinsfile is the set of instructions telling Jenkins what to do
// when the pipeline runs.
//
// Flow:
// GET CODE -> INSTALL BACKEND -> CHECK BACKEND
// -> INSTALL FRONTEND -> CHECK FRONTEND -> BUILD FRONTEND -> DONE

pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Install') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Backend Check') {
            steps {
                sh 'cd backend && node --check src/server.js'
            }
        }

        stage('Frontend Install') {
            steps {
                sh 'cd frontend && npm install'
            }
        }

        stage('Frontend Lint') {
            steps {
                sh 'cd frontend && npm run lint'
            }
        }

        // Linting checks your code for things like:
        // problematic code patterns
        // syntax issues
        // unused/problematic code
        // style/code-quality issues depending on configuration

        stage('Frontend Build') {
            steps {
                sh 'cd frontend && npm run build'
            }
        }
    }

    // The post section is used to define actions that should be taken after the pipeline has completed.(giving update to the github after sucess of the jenkins)
    
     post {
        always {
            publishChecks(
                name: 'Jenkins CI',
                status: 'COMPLETED',
                conclusion: currentBuild.currentResult == 'SUCCESS'
                    ? 'SUCCESS'
                    : 'FAILURE',
                summary: "Jenkins CI: ${currentBuild.currentResult}",
                detailsURL: env.BUILD_URL
            )
        }
    }
}
