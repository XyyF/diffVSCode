const queryConfigs = {
  'pages/upgrade/refund/uploadMaterial/index': [
    'type=1',
    'type=1&identityList=["孩子1", "孩子2"]',
    'type=1&excludes=["parent"]',
    'type=1&excludes=["parent"]&identityList=["孩子1", "孩子2"]',
    'type=2',
    'type=3',
    'type=3&identityList=[{"name":"支付人1","payer_card":"123"},{"name":"支付人2","payer_card":"12312"}]',
    'type=4',
    'type=4&identityList=["孩子1", "孩子2"]',
    'type=4&excludes=["parent"]',
    'type=4&excludes=["parent"]&identityList=["孩子1", "孩子2"]',
    'type=5',
    'type=5&excludes=["agent_info1"]',
    'type=5&excludes=["agent_info2"]',
    'type=5&excludes=["agent_info1", "agent_info2"]',
    'type=6&identityList=["孩子1", "孩子2"]',
  ],
}

module.exports =  {
  queryConfigs,
}