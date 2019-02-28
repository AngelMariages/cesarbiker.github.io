(module
  (type $t0 (func (param f64 f64) (result f64)))
  (type $t1 (func (param f64) (result f64)))
  (type $t2 (func))
  (import "env" "__memory_base" (global $env.__memory_base i32))
  (import "env" "memory" (memory $env.memory 256))
  (func $_multiply (type $t0) (param $p0 f64) (param $p1 f64) (result f64)
    get_local $p0
    get_local $p1
    f64.mul
    call $_setPrecision)
  (func $_setPrecision (type $t1) (param $p0 f64) (result f64)
    (local $l0 f64)
    get_global $env.__memory_base
    i32.const 5242880
    i32.add
    f64.load
    tee_local $l0
    f64.const 0x0p+0 (;=0;)
    f64.eq
    if $I0
      get_global $env.__memory_base
      i32.const 5242880
      i32.add
      f64.const 0x1.e848p+19 (;=1e+06;)
      f64.store
      f64.const 0x1.e848p+19 (;=1e+06;)
      set_local $l0
    end
    get_local $l0
    get_local $p0
    f64.mul
    f64.floor
    get_local $l0
    f64.div)
  (func $_pow (type $t0) (param $p0 f64) (param $p1 f64) (result f64)
    (local $l0 i32) (local $l1 f64)
    get_local $p1
    f64.const 0x1p+0 (;=1;)
    f64.gt
    if $I0
      i32.const 1
      set_local $l0
      get_local $p0
      set_local $l1
      loop $L1 (result f64)
        get_local $l1
        get_local $p0
        f64.mul
        set_local $l1
        get_local $l0
        i32.const 1
        i32.add
        tee_local $l0
        f64.convert_s/i32
        get_local $p1
        f64.lt
        br_if $L1
        get_local $l1
      end
      set_local $p0
    end
    get_local $p0)
  (func $__post_instantiate (type $t2)
    get_global $env.__memory_base
    set_global $g1
    get_global $g1
    i32.const 5242880
    i32.add
    set_global $g2)
  (global $g1 (mut i32) (i32.const 0))
  (global $g2 (mut i32) (i32.const 0))
  (global $_precision i32 (i32.const 5242880))
  (export "__post_instantiate" (func $__post_instantiate))
  (export "_multiply" (func $_multiply))
  (export "_pow" (func $_pow))
  (export "_setPrecision" (func $_setPrecision))
  (export "_precision" (global 3)))
