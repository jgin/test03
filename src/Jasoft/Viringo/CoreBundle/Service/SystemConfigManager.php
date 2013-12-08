<?php

namespace Jasoft\Viringo\CoreBundle\Service;

/**
 * @author gin
 */
class SystemConfigManager {
    
    
    const MASTER_CONNECTION_URL="master.connection.url";
    
    
    /**
     *
     * @var \Jasoft\Viringo\CoreBundle\Repository\SystemConfigRepository
     */
    private $systemConfigRepository;
    
    /**
     * 
     * @param type $name
     * @return \Jasoft\Viringo\CoreBundle\Entity\SystemConfig
     */
    public function getSystemConfigByName($name) {
        return $this->systemConfigRepository->findOneBy(array('name'=>$name));
    }
    
    /**
     * 
     * @param type $name
     * @return integer
     */
    public function getIntConfigValueByName($name) {
        return $this->getSystemConfigByName($name)->getIntValue();
    }
    
    /**
     * 
     * @param type $name
     * @return string
     */
    public function getTextConfigValueByName($name) {
        return $this->getSystemConfigByName($name)->getTextValue();
    }
    
    
    ///////////////////////////
    /// Getters y Setters
    ///////////////////////////
    
    public function getSystemConfigRepository() {
        return $this->systemConfigRepository;
    }

    public function setSystemConfigRepository(\Jasoft\Viringo\CoreBundle\Repository\SystemConfigRepository $systemConfigRepository) {
        $this->systemConfigRepository = $systemConfigRepository;
    }


}
