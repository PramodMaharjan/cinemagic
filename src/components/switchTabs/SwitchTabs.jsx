import { useState } from 'react';
import './style.scss';

const SwitchTabs = ({ data, handleTab }) => {
    const [activeTab, setActiveTab] = useState(0)
    const [left, setLeft] = useState(0)
    const handleActiveTab = (tab, index) => {
        setLeft(index * 100)
        setActiveTab(index)
        handleTab(tab)
    }
    return (
        <div className='switchTabs'>
            <div className='tabItems'>
                {data?.map((tab, index) => (
                    <div
                        className={`tabItem ${activeTab === index ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleActiveTab(tab, index)}
                    >
                        <span>{tab}</span>
                    </div>
                ))}
                <span className='bgEffect' style={{ left }} />
            </div>

        </div>
    )
}

export default SwitchTabs
