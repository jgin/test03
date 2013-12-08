<?php

namespace Jasoft\Viringo\SecurityBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * SystemUser
 *
 * @ORM\Table(name="system_user")
 * @ORM\Entity(repositoryClass="Jasoft\Viringo\SecurityBundle\Repository\SystemUserRepository")
 */
class SystemUser extends \Jasoft\Viringo\CoreBundle\Entity\Entity
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, unique=true)
     */
    private $username;

    /**
     * @var SystemUserType
     *
     * @ORM\ManyToOne(targetEntity="SystemUserType")
     * @ORM\JoinColumn(name="system_user_type_id", referencedColumnName="id")
     */
    private $userType;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return SystemUser
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }


    /**
     * Set userType
     *
     * @param \Jasoft\Viringo\SecurityBundle\Entity\SystemUserType $userType
     * @return SystemUser
     */
    public function setUserType(\Jasoft\Viringo\SecurityBundle\Entity\SystemUserType $userType = null)
    {
        $this->userType = $userType;

        return $this;
    }

    /**
     * Get userType
     *
     * @return \Jasoft\Viringo\SecurityBundle\Entity\SystemUserType 
     */
    public function getUserType()
    {
        return $this->userType;
    }
}
