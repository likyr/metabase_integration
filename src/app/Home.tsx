import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { USERS, US_STATES } from '../utils/config'
import styles from '../components/Home/Home.module.css'

const stateMap = new Map<string, string>(US_STATES.map(s => [s.value, s.label]))

const formatUserStates = (states: string[]): string => {
  return states.map(s => stateMap.get(s) ?? s).join(', ')
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeCard}>
        {USERS.map((user) => (
          <Button
            key={user.id}
            type="primary"
            size="large"
            icon={<UserOutlined />}
            onClick={() => navigate(`/dashboard/${user.id}`)}
            block
          >
            {user.name} ({formatUserStates(user.states)})
          </Button>
        ))}
      </div>
    </div>
  )
}
