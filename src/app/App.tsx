import { useParams } from 'react-router-dom'
import { Card } from 'antd'
import { MetabaseProvider, InteractiveQuestion } from '@metabase/embedding-sdk-react'
import { getMetabaseConfig, createAuthConfig, getUserById, USERS, buildStateParameters } from '../utils/config'
import { DashboardLayout } from '../components/Layout/DashboardLayout'

function App() {
  const { userId } = useParams<{ userId: string }>()
  
  const config = getMetabaseConfig()
  const user = getUserById(userId || '') || USERS[0]
  const authConfig = createAuthConfig(config)
  const sqlParameters = buildStateParameters(user.states)

  const questions = config.questionIds.map((questionId, index) => ({
    questionId,
    title: `Question ${index + 1} (ID: ${questionId})`,
    sqlParameters,
  }))

  return (
    <MetabaseProvider authConfig={authConfig}>
      <DashboardLayout user={user}>
        {questions.map((question) => (
          <Card key={question.questionId} title={question.title}>
            <InteractiveQuestion
              questionId={question.questionId}
              initialSqlParameters={question.sqlParameters}
            />
          </Card>
        ))}
      </DashboardLayout>
    </MetabaseProvider>
  )
}

export default App
