<?php
/**
 * PHPLock进程锁
 * 本进程锁用来解决php在并发时候的锁控制
 * 他根据文件锁来模拟多个进程之间的锁定，效率不是非常高。如果文件建立在内存中，可以大大提高效率。
 * PHPLOCK在使用过程中，会在指定的目录产生$hashNum个文件用来产生对应粒度的锁。不同锁之间可以并行执行。
 * 这有点类似mysql的innodb的行级锁，不同行的更新可以并发的执行。
 * @link http://code.google.com/p/phplock/
 * @author sunli
 * @blog http://sunli.cnblogs.com
 * @svnversion  $Id: class.phplock.php 6 2010-06-28 03:13:02Z sunli1223 $
 * @version v1.0 beta1
 * @license Apache License Version 2.0
 * @copyright  sunli1223@gmail.com
 */

class phplock {
	/**
	 * 锁文件路径
	 *
	 * @var String
	 */
	private $path = null;
	/**
	 * 文件句柄
	 *
	 * @var resource 
	 */
	private $fp = null;
	/**
	 * 锁的粒度控制，设置的越大粒度越小
	 *
	 * @var int
	 */
	private $hashNum = 100;
	private $name;
	private $eAccelerator = false;
        private $expire;

        /**
	 * 构造函数
	 *
	 * @param string $path 锁的存放目录，以"/"结尾
	 * @param string $name 锁名称，一般在对资源加锁的时候，会命名一个名字，这样不同的资源可以并发的进行。
         * @param int $expire 最長保留時間，單位是秒
	 */
	public function __construct($path = null, $name = null, $expire = 1) {
            if (is_null($path))
            {
                $path = sys_get_temp_dir().'/';
            }
            if (is_null($name))
            {
                $name = 'phplock';
            }
            
		$this->path = $path . ($this->mycrc32 ( $name ) % $this->hashNum) . '.txt';
		$this->eAccelerator = function_exists ( "eaccelerator_lock" );
		$this->name = $name;
                $this->expire = $expire;
	}
	/**
	 * crc32的封装
	 *
	 * @param string $string
	 * @return int
	 */
	private function mycrc32($string) {
		$crc = abs ( crc32 ( $string ) );
		if ($crc & 0x80000000) {
			$crc ^= 0xffffffff;
			$crc += 1;
		}
		return $crc;
	}
	/**
	 * 初始化锁，是加锁前的必须步骤
	 * 打开一个文件
	 *
	 */
	public function startLock() {
		if (! $this->eAccelerator) {
			$this->fp = fopen ( $this->path, "w" );
		}
	}
	/**
	 * 开始加锁
	 *
	 * @return bool 加锁成功返回true,失败返回false
	 */
	public function lock() {
		if (! $this->eAccelerator) {
			if ($this->fp === false) {
				return false;
			}
                        $result = false;
                        $result = flock ( $this->fp, LOCK_EX );
                        
                        //防止死鎖
                        /*
                        if (file_exists($this->path) && @time()-fileatime($this->path) > $this->expire) {
                            $this->unlock();
                            $this->endLock ();   
                            $this->startLock();
                            $result = flock ( $this->fp, LOCK_EX );
                        }
                        */
                        return $result;
		} else {
			return eaccelerator_lock ( $this->name );
		}
	}
        
        public function isLock() {
            return file_exists($this->path);
        }

                /**
	 * 释放锁
	 *
	 */
	public function unlock() {
		if (! $this->eAccelerator) {
			if ($this->fp !== false) {
				flock ( $this->fp, LOCK_UN );
				clearstatcache ();
			}
		} else {
			return eaccelerator_unlock ( $this->name );
		}
	}
	/**
	 * 结束锁控制
	 *
	 */
	public function endLock() {
		if (! $this->eAccelerator) {
			fclose ( $this->fp );
                        @unlink($this->path);
		}
	}
}

?>