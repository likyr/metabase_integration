import type { ReactNode } from 'react'
import { Button, Space, Typography } from 'antd'
import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { User } from '../../utils/config.ts'
import styles from './DashboardLayout.module.css'

const { Title } = Typography

interface DashboardLayoutProps {
  user: User
  children: ReactNode
}

export const DashboardLayout = ({ user, children }: DashboardLayoutProps) => {
  const navigate = useNavigate()

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Space align="center">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            type="default"
          >
            Back
          </Button>
          <Space>
            <UserOutlined className={styles.icon} />
            <Title level={3} className={styles.title}>
              {user.name}
            </Title>
          </Space>
        </Space>
      </div>
      <div className={styles.body}>
        <div className={styles.questionsContainer}>{children}</div>
      </div>
    </div>
  )
}

